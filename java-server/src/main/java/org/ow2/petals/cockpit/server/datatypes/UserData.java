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
package org.ow2.petals.cockpit.server.datatypes;

import java.io.Serializable;
import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.ws.rs.core.SecurityContext;

import org.eclipse.jetty.security.SecurityHandler;
import org.hibernate.validator.constraints.NotEmpty;
import org.ow2.petals.cockpit.server.CockpitApplication;
import org.ow2.petals.cockpit.server.filters.AuthenticationFilter;
import org.ow2.petals.cockpit.server.resources.Sessions;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Represent a user and its roles: stored in the session and sent to clients.
 * 
 * {@link Principal} is needed for integration with {@link SecurityContext} in {@link AuthenticationFilter}.
 * 
 * {@link Serializable} is needed for storing this information in the {@link HttpSession} in {@link Sessions}.
 * 
 * TODO maybe separate the class for the json returned to the client from the value used internally?
 * 
 * TODO Or if we use jetty's {@link SecurityHandler} (see {@link CockpitApplication}), then {@link UserData} will only
 * be used to return data (in {@link Sessions}).
 * 
 * @author vnoel
 *
 */
public class UserData implements Principal, Serializable {

    private static final long serialVersionUID = 2285468118622653460L;

    @NotEmpty
    private final String username;

    private final List<String> roles;

    public UserData(String username, List<String> roles) {
        this.username = username;
        this.roles = roles;
    }

    @JsonProperty
    public String getUsername() {
        return username;
    }

    @JsonProperty
    public List<String> getRoles() {
        return roles;
    }

    @JsonIgnore
    @Override
    public String getName() {
        return username;
    }
}