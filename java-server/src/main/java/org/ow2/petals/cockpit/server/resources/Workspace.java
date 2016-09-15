/**
 * Copyright (c) 2016 Linagora
 * 
 * This program/library is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 2.1 of the License, or (at your
 * option) any later version.
 * 
 * This program/library is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License
 * for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program/library; If not, see http://www.gnu.org/licenses/
 * for the GNU Lesser General Public License version 2.1.
 */
package org.ow2.petals.cockpit.server.resources;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import org.eclipse.jdt.annotation.Nullable;
import org.ow2.petals.cockpit.server.configurations.WorkspaceElementConfiguration;
import org.ow2.petals.cockpit.server.configurations.WorkspaceElementConfiguration.Conf;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.allanbank.mongodb.MongoCollection;
import com.allanbank.mongodb.MongoDatabase;
import com.allanbank.mongodb.bson.Document;
import com.allanbank.mongodb.bson.DocumentAssignable;
import com.allanbank.mongodb.bson.Element;
import com.allanbank.mongodb.bson.builder.BuilderFactory;
import com.allanbank.mongodb.bson.element.ArrayElement;
import com.allanbank.mongodb.bson.element.DocumentElement;
import com.allanbank.mongodb.bson.element.ObjectId;
import com.allanbank.mongodb.bson.element.ObjectIdElement;
import com.allanbank.mongodb.builder.QueryBuilder;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

import co.paralleluniverse.fibers.Suspendable;

/**
 * Serves workspace content to clients
 * 
 * @author vnoel
 *
 */
@Path("/workspaces")
@Produces(MediaType.APPLICATION_JSON)
@PermitAll
public class Workspace {

    private static final Logger LOG = LoggerFactory.getLogger(Workspace.class);

    private final MongoCollection elements;

    private final WorkspaceElementConfiguration elementsConf;

    @Inject
    public Workspace(MongoDatabase db, WorkspaceElementConfiguration elementsConf) {
        this.elements = db.getCollection("workspace-elements");
        this.elementsConf = elementsConf;
    }

    @GET
    @Suspendable
    public List<WorkspaceElement> getWorkspaces() {
        final List<WorkspaceElement> res = new ArrayList<>();

        for (Document e : elements.find(QueryBuilder.where("type").equals("workspace"))) {
            res.add(buildWorkspaceElement(e, false, false));
        }

        return res;
    }

    @GET
    @Path("/{id}/configuration")
    @Suspendable
    public WorkspaceElementConfiguration.Conf getWorkspaceConfiguration(@PathParam("id") String wsId) {
        final Document element;
        try {
            // TODO should we work we indexed field instead?
            element = elements
                    .findOne(QueryBuilder.where("name").equals(wsId).and("type").equals("workspace"));
        } catch (final IllegalArgumentException e) {
            throw new WebApplicationException(Status.NOT_FOUND);
        }

        final Conf conf = elementsConf.getConfiguration(element.get("config").getValueAsString());
        assert conf != null;
        return conf;
    }

    @GET
    @Path("/{id}/elements/{eid}")
    @Suspendable
    public WorkspaceElement getElement(@PathParam("eid") String elementId) {
        final Document element;
        try {
            // TODO would we want to check the workspace validity?
            element = elements.findOne(QueryBuilder.where("_id").equals(new ObjectId(elementId)));
        } catch (final IllegalArgumentException e) {
            throw new WebApplicationException(Status.NOT_FOUND);
        }

        if (element == null) {
            throw new WebApplicationException(Status.NOT_FOUND);
        } else {
            return buildWorkspaceElement(element, true, false);
        }
    }

    @GET
    @Path("/{id}/elements")
    @Suspendable
    public WorkspaceElement getWorkspace(@PathParam("id") String wsId) {
        // TODO should we work we indexed field instead?
        final Document ws = elements.findOne(QueryBuilder.where("name").equals(wsId).and("type").equals("workspace"));

        if (ws != null) {
            return buildWorkspaceElement(ws, false, true);
        } else {
            throw new WebApplicationException(Status.NOT_FOUND);
        }
    }

    @Suspendable
    private WorkspaceElement buildWorkspaceElement(Document ws, boolean withConfig, boolean withChildren) {

        final String name = ws.get("name").getValueAsString();
        assert name != null;

        final String type = ws.get("type").getValueAsString();
        assert type != null;

        final String id = ws.get(ObjectIdElement.class, "_id").getId().toHexString();
        assert id != null;

        final ObjectIdElement parentE = ws.get(ObjectIdElement.class, "parent");
        final String parent = parentE != null ? parentE.getId().toHexString() : null;

        final List<WorkspaceElement> children = withChildren ? buildChildren(ws) : null;

        final Element state = ws.get("state");

        final DocumentAssignable config;
        if (withConfig) {
            DocumentElement configElement = ws.get(DocumentElement.class, "config");
            config = configElement == null ? BuilderFactory.d() : configElement.getValueAsObject();
        } else {
            config = null;
        }

        if (!elementsConf.existsType(type)) {
            LOG.warn("Workspace element {} has unknown type {}", name, type);
        }

        return new WorkspaceElement(id, name, type,
                state == null ? null : state.getValueAsString(), children, parent, config);
    }

    @Suspendable
    private List<WorkspaceElement> buildChildren(Document ws) {
        final ArrayElement els = ws.get(ArrayElement.class, "children");
        final List<WorkspaceElement> children = new ArrayList<>(els.getEntries().size());
        for(Element el: els.getEntries()) {
            final Document d = elements.findOne(QueryBuilder.where("_id").equals((ObjectId) el.getValueAsObject()));
            children.add(buildWorkspaceElement(d, false, true));
        }
        return children;
    }

}

/**
 * Sent to clients
 */
@JsonInclude(Include.NON_NULL)
class WorkspaceElement {

    @Nullable
    private final String id;

    @Nullable
    private final String name;

    @Nullable
    private final String type;

    @Nullable
    private final String state;

    @Nullable
    private final List<WorkspaceElement> children;

    @Nullable
    private final String parent;

    @Nullable
    private final DocumentAssignable config;

    public WorkspaceElement(@JsonProperty("name") String name, @JsonProperty("type") String type,
            @JsonProperty("state") @Nullable String state, @JsonProperty("parent") @Nullable String parent,
            @JsonProperty("config") @Nullable DocumentAssignable config) {
        this.id = null;
        this.name = name;
        this.type = type;
        this.state = state;
        this.children = null;
        this.parent = parent;
        this.config = config;
    }

    public WorkspaceElement(String id, String name, String type, @Nullable String state,
            @Nullable List<WorkspaceElement> children, @Nullable String parent, @Nullable DocumentAssignable config) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.state = state;
        this.children = children;
        this.parent = parent;
        this.config = config;
    }

    @Nullable
    public String getId() {
        return id;
    }

    @Nullable
    public String getName() {
        return name;
    }

    @Nullable
    public String getType() {
        return type;
    }

    @Nullable
    public String getState() {
        return state;
    }

    @Nullable
    public String getParent() {
        return parent;
    }

    @Nullable
    public DocumentAssignable getConfig() {
        return config;
    }

    @Nullable
    public List<WorkspaceElement> getChildren() {
        return children;
    }

    @Override
    public String toString() {
        return "WorkspaceElement [id=" + id + ", name=" + name + ", type=" + type + ", state=" + state + ", children="
                + children + ", parent=" + parent + ", config=" + config + "]";
    }
}
