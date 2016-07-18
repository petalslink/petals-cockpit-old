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
package org.ow2.petals.cockpit.server.filters;

import java.io.IOException;
import java.security.Principal;

import javax.annotation.Priority;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Priorities;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;

import org.eclipse.jdt.annotation.Nullable;
import org.eclipse.jetty.security.SecurityHandler;
import org.ow2.petals.cockpit.server.CockpitApplication;
import org.ow2.petals.cockpit.server.datatypes.UserData;

import io.dropwizard.auth.AuthFilter;
import io.dropwizard.auth.CachingAuthenticator;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;

/**
 * Setup the security context based on the session
 * 
 * TODO maybe replace by using an extension of {@link AuthFilter} (similar to {@link BasicCredentialAuthFilter} in order
 * to be able to take advantage of things like {@link CachingAuthenticator}... ?
 * 
 * TODO or by using jetty's {@link SecurityHandler} (see {@link CockpitApplication})?
 * 
 * We need the {@link Provider} annotation for the {@link HttpServletRequest} to be injected.
 * 
 * @author vnoel
 *
 */
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    @Context
    @Nullable
    HttpServletRequest request;

    @Override
    public void filter(@Nullable ContainerRequestContext requestContext) throws IOException {
        assert requestContext != null;

        assert request != null;
        final HttpSession session = request.getSession(false);

        if (session != null && session.getAttribute("user") instanceof UserData) {

            final boolean isSecure = requestContext.getSecurityContext().isSecure();
            final UserData principal = (UserData) session.getAttribute("user");

            requestContext.setSecurityContext(new SecurityContext() {

                @Override
                public boolean isUserInRole(@Nullable String role) {
                    assert role != null;
                    return principal.getRoles().contains(role);
                }

                @Override
                public boolean isSecure() {
                    return isSecure;
                }

                @Override
                public Principal getUserPrincipal() {
                    return principal;
                }

                @Override
                public String getAuthenticationScheme() {
                    return FORM_AUTH;
                }
            });

            return;
        }

        throw new WebApplicationException(Status.UNAUTHORIZED);
    }

}
