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
package org.ow2.petals.cockpit.server.configurations;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.eclipse.jdt.annotation.Nullable;
import org.hibernate.validator.constraints.NotEmpty;

import com.allanbank.mongodb.MongoClient;
import com.allanbank.mongodb.MongoClientConfiguration;
import com.allanbank.mongodb.MongoDatabase;
import com.allanbank.mongodb.MongoFactory;
import com.fasterxml.jackson.annotation.JsonProperty;

import co.paralleluniverse.fibers.mongodb.FiberMongoFactory;
import io.dropwizard.Configuration;
import io.dropwizard.lifecycle.Managed;
import io.dropwizard.setup.Environment;

/**
 * Read from the main configuration YAML.
 * 
 * @author vnoel
 *
 */
public class CockpitConfiguration extends Configuration {

    @Valid
    @NotNull
    private MongoDatabaseFactory database = new MongoDatabaseFactory();

    @JsonProperty("mongo")
    public MongoDatabaseFactory getDatabaseFactory() {
        return database;
    }

    @JsonProperty("mongo")
    public void setDatabaseFactory(MongoDatabaseFactory database) {
        this.database = database;
    }

    public static class MongoDatabaseFactory {

        @Valid
        @NotNull
        private List<MongoServer> servers = new ArrayList<>();

        @NotEmpty
        private String database = "";

        @JsonProperty
        public String getDatabase() {
            return database;
        }

        @JsonProperty
        public void setDatabase(String database) {
            this.database = database;
        }

        @JsonProperty
        public List<MongoServer> getServers() {
            return servers;
        }

        @JsonProperty
        public void setServers(List<MongoServer> connections) {
            this.servers = connections;
        }

        @SuppressWarnings("resource")
        public MongoDatabase build(@Nullable Environment env, boolean fiber) {

            final MongoClientConfiguration mcc = new MongoClientConfiguration();

            if (!servers.isEmpty()) {
                for (final MongoServer server : servers) {
                    mcc.addServer(server.getHost() + ":" + server.getPort());
                }
            } else {
                mcc.addServer("localhost:27017");
            }

            final MongoClient client;
            if (fiber) {
                client = FiberMongoFactory.createClient(mcc);
            } else {
                client = MongoFactory.createClient(mcc);
            }

            if (env != null) {
                env.lifecycle().manage(new Managed() {

                    @Override
                    public void stop() throws Exception {
                        client.close();
                    }

                    @Override
                    public void start() throws Exception {
                        // it's automatically started
                    }
                });
            }

            return client.getDatabase(getDatabase());
        }

        public static class MongoServer {

            @NotEmpty
            private String host = "";

            @Min(1)
            @Max(65535)
            private int port = 27017;

            @JsonProperty
            public String getHost() {
                return host;
            }

            @JsonProperty
            public void setHost(String host) {
                this.host = host;
            }

            @JsonProperty
            public int getPort() {
                return port;
            }

            @JsonProperty
            public void setPort(int port) {
                this.port = port;
            }
        }
    }
}