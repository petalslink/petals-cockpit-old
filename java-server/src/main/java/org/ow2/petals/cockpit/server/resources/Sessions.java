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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.eclipse.jdt.annotation.Nullable;
import org.hibernate.validator.constraints.NotEmpty;
import org.mindrot.jbcrypt.BCrypt;
import org.ow2.petals.cockpit.server.datatypes.UserData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.allanbank.mongodb.MongoCollection;
import com.allanbank.mongodb.MongoDatabase;
import com.allanbank.mongodb.bson.Document;
import com.allanbank.mongodb.bson.Element;
import com.allanbank.mongodb.bson.element.ArrayElement;
import com.allanbank.mongodb.builder.QueryBuilder;
import com.fasterxml.jackson.annotation.JsonProperty;

import co.paralleluniverse.fibers.Suspendable;
import io.dropwizard.auth.Auth;
import io.dropwizard.jersey.sessions.Session;

/**
 * @author vnoel
 */
@Path("/session")
@Produces(MediaType.APPLICATION_JSON)
public class Sessions {

    private static final Logger LOG = LoggerFactory.getLogger(Sessions.class);

    private final MongoDatabase db;

    @Inject
    public Sessions(MongoDatabase db) {
        this.db = db;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Suspendable
    public Response login(@Valid Authentication auth, @Context HttpServletRequest request) {
        // TODO fail if there is already a session??
        // Implementation of your authentication logic
        final UserData user = authenticate(auth.getUsername(), auth.getPassword());
        if (user != null) {
            final HttpSession session = request.getSession(true);
            session.setAttribute("user", user);
            // Set the session attributes as you wish
            return Response.ok(user).build();
        }

        return Response.status(Status.UNAUTHORIZED).build();
    }

    @DELETE
    @PermitAll
    public Response logout(@Session(doNotCreate = true) HttpSession session, @Auth UserData user) {
        LOG.debug("Invalidating {}", user.getUsername());
        session.invalidate();
        return Response.ok().build();
    }

    @GET
    @PermitAll
    public Response status(@Auth UserData user) {
        LOG.debug("Returning infos for {}", user.getUsername());
        return Response.ok(user).build();
    }

    @Suspendable
    @Nullable
    private UserData authenticate(String username, String password) {
        LOG.debug("Loading {}", username);
        final MongoCollection users = db.getCollection("users");
        final Document user = users.findOne(QueryBuilder.where("username").equals(username));
        if (user == null) {
            LOG.debug("No user found for {}", username);
            return null;
        } else {
            LOG.debug("Found {}", user);
            final String hashed = user.get("password").getValueAsString();
            if (BCrypt.checkpw(password, hashed)) {
                final List<Element> entries = user.get(ArrayElement.class, "roles").getEntries();
                final List<String> roles = new ArrayList<>(entries.size());
                for (final Element e : entries) {
                    roles.add(e.getValueAsString());
                }
                return new UserData(user.get("username").getValueAsString(), roles);
            } else {
                return null;
            }
        }
    }
}

/**
 * Read from clients
 */
class Authentication {

    @NotEmpty
    @JsonProperty
    private String username = "";

    @NotEmpty
    @JsonProperty
    private String password = "";

    public String getUsername() {
        return username;
    }
    
    public String getPassword() {
        return password;
    }
}