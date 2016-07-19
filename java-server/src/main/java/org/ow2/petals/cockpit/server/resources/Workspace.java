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

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.eclipse.jdt.annotation.Nullable;
import org.ow2.petals.cockpit.server.configurations.WorkspaceElementConfiguration;
import org.ow2.petals.cockpit.server.configurations.WorkspaceElementConfiguration.Conf;
import org.ow2.petals.cockpit.server.utils.StrictJson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.allanbank.mongodb.MongoCollection;
import com.allanbank.mongodb.MongoDatabase;
import com.allanbank.mongodb.bson.Document;
import com.allanbank.mongodb.bson.Element;
import com.allanbank.mongodb.bson.element.ArrayElement;
import com.allanbank.mongodb.bson.element.DocumentElement;
import com.allanbank.mongodb.bson.element.ObjectId;
import com.allanbank.mongodb.bson.element.ObjectIdElement;
import com.allanbank.mongodb.builder.QueryBuilder;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import co.paralleluniverse.fibers.Suspendable;

/**
 * Serves workspace content to clients
 * 
 * @author vnoel
 *
 */
@Path("/workspace/{id}")
@Produces(MediaType.APPLICATION_JSON)
// @PermitAll
public class Workspace {

    private static final Logger LOG = LoggerFactory.getLogger(Workspace.class);

    private final MongoDatabase db;

    private WorkspaceElementConfiguration typeConf;

    public Workspace(MongoDatabase db, WorkspaceElementConfiguration typeConf) {
        this.db = db;
        this.typeConf = typeConf;
    }

    @GET
    @Path("/configuration")
    public WorkspaceElementConfiguration.Conf getWorkspaceConfiguration() {
        // TODO shouldn't "default" be stored with the workspace?
        final Conf conf = typeConf.getConfiguration("default");
        assert conf != null;
        return conf;
    }

    @GET
    @Path("/element/{eid}")
    @Suspendable
    public Response getElementConfiguration(@PathParam("id") String wsId, @PathParam("eid") String elementId) {

        final MongoCollection elements = db.getCollection("workspace-elements");

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
            final DocumentElement config = element.get(DocumentElement.class, "config");
            return Response.ok(StrictJson.serialize(config.getDocument())).build();
        }
    }

    @GET
    @Path("/elements")
    @Suspendable
    public WorkspaceElement getWorkspace(@PathParam("id") String wsId) {

        final MongoCollection elements = db.getCollection("workspace-elements");

        // TODO should we work we indexed field instead?
        final Document ws = elements
                .findOne(QueryBuilder.where("name").equals(wsId).and("type").equals("workspace"));

        if (ws != null) {
            return buildElement(ws, elements);
        } else {
            throw new WebApplicationException(Status.NOT_FOUND);
        }
    }

    @Suspendable
    private WorkspaceElement buildElement(Document ws, MongoCollection elements) {
        final String name = ws.get("name").getValueAsString();
        assert name != null;
        final String type = ws.get("type").getValueAsString();
        assert type != null;
        final String id = ws.get(ObjectIdElement.class, "_id").getId().toHexString();
        assert id != null;
        if (!typeConf.existsType(type)) {
            LOG.warn("Workspace element {} has unknown type {}", name, type);
        }
        final List<WorkspaceElement> children = buildChildren(ws, elements);
        final Element state = ws.get("state");
        return new WorkspaceElement(id, name, type,
                state == null ? null : state.getValueAsString(), children);
    }

    @Suspendable
    private List<WorkspaceElement> buildChildren(Document ws, MongoCollection elements) {
        final ArrayElement els = ws.get(ArrayElement.class, "children");
        final List<WorkspaceElement> children = new ArrayList<>(els.getEntries().size());
        for(Element el: els.getEntries()) {
            final Document d = elements.findOne(QueryBuilder.where("_id").equals((ObjectId) el.getValueAsObject()));
            children.add(buildElement(d, elements));
        }
        return children;
    }

}

/**
 * Sent to clients
 */
@JsonInclude(Include.NON_NULL)
class WorkspaceElement {

    private final String id;

    private final String name;

    private final String type;

    @Nullable
    private final String state;

    private final List<WorkspaceElement> children;

    public WorkspaceElement(String id, String name, String type, @Nullable String state,
            List<WorkspaceElement> children) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.state = state;
        this.children = children;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    @Nullable
    public String getState() {
        return state;
    }

    public List<WorkspaceElement> getChildren() {
        return children;
    }
}