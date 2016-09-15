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
package org.ow2.petals.cockpit.server.dw;

import javax.servlet.Servlet;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

import com.google.common.base.Function;

import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.setup.Environment;

public abstract class FiberApplication<T extends Configuration> extends Application<T> {

    @Override
    public final void run(T configuration, final Environment environment) throws Exception {
        fiberRun(configuration, environment);
        environment.jersey().replace(new Function<ResourceConfig, Servlet>() {
            @Override
            public Servlet apply(ResourceConfig f) {
                return new co.paralleluniverse.fibers.jersey.ServletContainer(
                        (ServletContainer) environment.getJerseyServletContainer());
            }
        });
    }

    public abstract void fiberRun(T configuration, Environment environment) throws Exception;
}
