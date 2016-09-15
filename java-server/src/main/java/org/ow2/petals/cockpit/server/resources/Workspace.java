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
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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
import com.allanbank.mongodb.bson.builder.DocumentBuilder;
import com.allanbank.mongodb.bson.element.ArrayElement;
import com.allanbank.mongodb.bson.element.DocumentElement;
import com.allanbank.mongodb.bson.element.ObjectId;
import com.allanbank.mongodb.bson.element.ObjectIdElement;
import com.allanbank.mongodb.builder.BatchedWrite;
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
        // TODO should we work we indexed field instead?
        final Document element = elements
                .findOne(QueryBuilder.where("name").equals(wsId).and("type").equals("workspace"));

        if (element == null) {
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

        final ObjectId id = buildObjectId(elementId, Status.NOT_FOUND);

        // TODO would we want to check the workspace validity?
        final Document element = elements.findOne(QueryBuilder.where("_id").equals(id));

        if (element == null) {
            throw new WebApplicationException(Status.NOT_FOUND);
        }

        return buildWorkspaceElement(element, true, false);
    }

    @POST
    @Path("/{id}/elements")
    @Consumes(MediaType.APPLICATION_JSON)
    @Suspendable
    public WorkspaceElement addElement(@Valid WorkspaceElement element) {

        if (element.getName() == null || element.getParent() == null || element.getType() == null) {
            throw new WebApplicationException(Status.BAD_REQUEST);
        }

        // TODO validate parent exists
        final ObjectId parent = buildObjectId(element.getParent(), Status.BAD_REQUEST);
        final ObjectId id = new ObjectId();

        final BatchedWrite.Builder writes = BatchedWrite.builder();

        final DocumentBuilder doc = BuilderFactory.start();
        doc.add("_id", id);
        doc.add("name", element.getName());
        if (element.getState() != null) {
            doc.add("state", element.getState());
        }
        doc.add("type", element.getType());
        doc.add("parent", parent);
        doc.pushArray("children");
        doc.add("config", element.getConfig());

        final Document newElement = doc.build();

        writes.insert(newElement);

        final DocumentBuilder update = BuilderFactory.start();
        update.push("$push").add("children", id);
        writes.update(QueryBuilder.where("_id").equals(parent), update);

        elements.write(writes);

        return buildWorkspaceElement(newElement, false, false);
    }

    @DELETE
    @Path("/{id}/elements/{eid}")
    @Suspendable
    public void deleteElement(@PathParam("eid") String elementId) {

        final ObjectId id = buildObjectId(elementId, Status.NOT_FOUND);

        final Document element = elements.findOne(QueryBuilder.where("_id").equals(id));

        if (element == null) {
            throw new WebApplicationException(Status.NOT_FOUND);
        }

        final ArrayElement children = element.get(ArrayElement.class, "children");

        if (children != null && !children.getEntries().isEmpty()) {
            // TODO this is not the correct return code?
            throw new WebApplicationException(Status.BAD_REQUEST);
        }

        final ObjectIdElement parent = element.get(ObjectIdElement.class, "parent");

        final BatchedWrite.Builder writes = BatchedWrite.builder();

        if (parent != null) {
            final DocumentBuilder update = BuilderFactory.start();
            update.push("$pullAll").add("children", BuilderFactory.a(id));
            writes.update(QueryBuilder.where("_id").equals(parent.getId()), update);
        }

        writes.delete(QueryBuilder.where("_id").equals(id));

        elements.write(writes);
    }

    @GET
    @Path("/{id}/elements")
    @Suspendable
    public WorkspaceElement getWorkspace(@PathParam("id") String wsId) {
        // TODO should we work we indexed field instead?
        final Document ws = elements.findOne(QueryBuilder.where("name").equals(wsId).and("type").equals("workspace"));

        if (ws == null) {
            throw new WebApplicationException(Status.NOT_FOUND);
        }

        return buildWorkspaceElement(ws, false, true);
    }

    private ObjectId buildObjectId(@Nullable String id, Status s) {
        try {
            return new ObjectId(id);
        } catch (IllegalArgumentException e) {
            LOG.debug("Bad Request", e);
            throw new WebApplicationException(s);
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
            LOG.warn("Workspace element {}/{} has unknown type {}", name, id, type);
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
