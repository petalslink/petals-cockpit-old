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
package org.ow2.petals.cockpit.server;

import javax.ws.rs.core.Feature;
import javax.ws.rs.core.FeatureContext;

import org.eclipse.jdt.annotation.Nullable;
import org.eclipse.jetty.security.SecurityHandler;
import org.eclipse.jetty.server.session.SessionHandler;
import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.jersey.ServiceLocatorProvider;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.ow2.petals.cockpit.server.commands.PopulateDbCommand;
import org.ow2.petals.cockpit.server.configurations.CockpitConfiguration;
import org.ow2.petals.cockpit.server.configurations.WorkspaceElementConfiguration;
import org.ow2.petals.cockpit.server.datatypes.UserData;
import org.ow2.petals.cockpit.server.filters.AuthenticationFilter;
import org.ow2.petals.cockpit.server.resources.Sessions;
import org.ow2.petals.cockpit.server.resources.Workspace;
import org.ow2.petals.cockpit.server.utils.DocumentAssignableWriter;

import com.allanbank.mongodb.MongoDatabase;
import com.codahale.metrics.health.HealthCheck;
import com.fasterxml.jackson.module.afterburner.AfterburnerModule;

import co.paralleluniverse.fibers.Fiber;
import co.paralleluniverse.fibers.SuspendExecution;
import co.paralleluniverse.fibers.dropwizard.FiberApplication;
import co.paralleluniverse.strands.SuspendableRunnable;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.configuration.ConfigurationFactory;
import io.dropwizard.configuration.DefaultConfigurationFactoryFactory;
import io.dropwizard.configuration.ResourceConfigurationSourceProvider;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

/**
 * Main configuration class for Petals Cockpit Server
 * 
 * @author vnoel
 *
 */
public class CockpitApplication extends FiberApplication<CockpitConfiguration> {

    @Nullable
    private ConfigurationFactory<WorkspaceElementConfiguration> factory;

    public static void main(String[] args) throws Exception {
        new CockpitApplication().run(args);
    }

    @Override
    public String getName() {
        return "Petals Cockpit";
    }

    @Override
    public void initialize(@Nullable Bootstrap<CockpitConfiguration> bootstrap) {
        assert bootstrap != null;

        bootstrap.addCommand(new PopulateDbCommand());

        // setup a factory used to read yml (the prefix is needed but we of course don't use it)
        factory = new DefaultConfigurationFactoryFactory<WorkspaceElementConfiguration>().create(
                WorkspaceElementConfiguration.class, bootstrap.getValidatorFactory().getValidator(),
                bootstrap.getObjectMapper(), "dw");
    }

    @Override
    public void fiberRun(CockpitConfiguration configuration, @Nullable Environment environment) throws Exception {

        assert environment != null;

        final MongoDatabase db = configuration.getDatabaseFactory().build(environment, true);

        // use bytecode instrumentation to improve performance of json serialization/deserialization
        environment.getObjectMapper().registerModule(new AfterburnerModule());

        environment.healthChecks().register("mongo", new MongoHealthCheck(db));

        // activate session management in jetty
        environment.servlets().setSessionHandler(new SessionHandler());

        // see below
        environment.jersey().register(new AuthFeature());
        environment.jersey().register(new DocumentAssignableWriter());

        assert factory != null;
        final WorkspaceElementConfiguration types = factory.build(new ResourceConfigurationSourceProvider(),
                "configurations.yml");

        final Sessions sessResource = new Sessions(db);
        final Workspace wsResource = new Workspace(db, types);

        environment.jersey().register(sessResource);
        environment.jersey().register(wsResource);
    }
}

/**
 * We need this {@link Feature} in order to access the {@link ServiceLocator} to inject manually the needed fields in
 * our {@link AuthenticationFilter}.
 * 
 * See https://github.com/dropwizard/dropwizard/issues/1630 and
 * http://stackoverflow.com/questions/35952773/access-httpservletrequest-from-an-authenticator-using-dropwizard/35953104#35953104
 * for explanations.
 * 
 * Note: we could maybe also have been using a jetty {@link SecurityHandler} which handles everything (except for
 * reading the data from the POST and the db query of course)
 */
class AuthFeature implements Feature {

    @Override
    public boolean configure(@Nullable FeatureContext context) {
        assert context != null;

        ServiceLocator locator = ServiceLocatorProvider.getServiceLocator(context);
        final AuthenticationFilter authenticator = new AuthenticationFilter();
        locator.inject(authenticator);

        // activate the filter on protected resources
        context.register(new AuthDynamicFeature(authenticator));
        // handle authorisation in resources
        context.register(RolesAllowedDynamicFeature.class);
        // handle @Auth in resource
        context.register(new AuthValueFactoryProvider.Binder<>(UserData.class));

        return true;
    }
}

class MongoHealthCheck extends HealthCheck {

    private final MongoDatabase db;

    public MongoHealthCheck(MongoDatabase db) {
        this.db = db;
    }

    @Override
    protected Result check() throws Exception {

        // doesn't work, see https://groups.google.com/d/msg/comsat-user/acFl7yBOBFM/LYxiVZ4WAQAJ
        // new Fiber<>(() -> db.stats()).start().get();

        new Fiber<>(new SuspendableRunnable() {
            private static final long serialVersionUID = -2308313348173416441L;

            @Override
            public void run() throws SuspendExecution, InterruptedException {
                db.stats();
            }
        }).start().get();

        return Result.healthy();
    }
}