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
package org.ow2.petals.cockpit.server.commands;

import java.io.InputStreamReader;

import org.eclipse.jdt.annotation.Nullable;
import org.mindrot.jbcrypt.BCrypt;
import org.ow2.petals.cockpit.server.configurations.CockpitConfiguration;

import com.allanbank.mongodb.MongoClient;
import com.allanbank.mongodb.MongoCollection;
import com.allanbank.mongodb.MongoDatabase;
import com.allanbank.mongodb.bson.Document;
import com.allanbank.mongodb.bson.builder.ArrayBuilder;
import com.allanbank.mongodb.bson.builder.BuilderFactory;
import com.allanbank.mongodb.bson.builder.DocumentBuilder;
import com.allanbank.mongodb.bson.element.ObjectId;
import com.allanbank.mongodb.bson.element.ObjectIdElement;
import com.allanbank.mongodb.bson.json.Json;
import com.allanbank.mongodb.builder.QueryBuilder;
import com.google.common.base.Optional;

import io.dropwizard.cli.ConfiguredCommand;
import io.dropwizard.setup.Bootstrap;
import net.sourceforge.argparse4j.inf.Namespace;

/**
 * This commands creates a Demo workspace in the database
 * 
 * @author vnoel
 *
 */
public class PopulateDbCommand extends ConfiguredCommand<CockpitConfiguration> {

    enum SUState {
        UNDEPLOYED, SHUTDOWN, STOPPED, STARTED
    }

    enum CompState {
        UNINSTALLED, SHUTDOWN, STOPPED, STARTED
    }

    enum ServerState {
        UNINSTALLED, STOPPED, STARTED;
    }

    public PopulateDbCommand() {
        super("populate-demo", "Populate de database with demon workspace and admin/admin user");
    }

    @Override
    protected void run(@Nullable Bootstrap<CockpitConfiguration> bootstrap, @Nullable Namespace namespace,
            CockpitConfiguration configuration) throws Exception {
        final MongoClient client = configuration.getDatabaseFactory().buildClient(null, false);
        final MongoDatabase db = client.getDatabase(configuration.getDatabaseFactory().getDatabase());

        final MongoCollection users = db.getCollection("users");
        final Document user = users.findOne(QueryBuilder.where("username").equals("admin"));
        if (user == null) {
            final DocumentBuilder builder = BuilderFactory.start();
            builder.add("username", "admin");
            builder.add("password", BCrypt.hashpw("admin", BCrypt.gensalt()));
            builder.pushArray("roles").add("USER").add("ADMIN");
            users.insert(builder.build());
        }

        final MongoCollection elements = db.getCollection("workspace-elements");
        assert elements != null;

        final ObjectId su1 = insertSU(elements, "SU-CONSUME 1", SUState.UNDEPLOYED, false, "su-consume-1.json");
        final ObjectId su2 = insertSU(elements, "SU-PROVIDE 1", SUState.UNDEPLOYED, true, "su-provide-1.json");
        final ObjectId compo = insertComponent(elements, "BC-SOAP 1", CompState.UNINSTALLED, "bc-soap.json", su1, su2);
        final ObjectId server2 = insertServer(elements, "server 2", ServerState.UNINSTALLED, "server-2.json", compo);
        final ObjectId server1 = insertServer(elements, "server 1", ServerState.UNINSTALLED, "server-1.json");
        final ObjectId bus = insertBus(elements, "BUS 1", "bus-1.json", server1, server2);
        final ObjectId ws = insertWorkspace(elements, "Demo", bus);

        System.out.println("Created workspace demo with id " + ws);
    }

    private ObjectId insertElement(MongoCollection elements, String name, Optional<Enum<?>> state, String type,
            @Nullable String config, ObjectId... children) {


        final DocumentBuilder builder = BuilderFactory.start();
        builder.add("name", name);
        if (state.isPresent()) {
            builder.add("state", state.get().name());
        }
        builder.add("type", type);
        final ArrayBuilder cs = builder.pushArray("children");
        for (final ObjectId c : children) {
            cs.add(c);
        }

        if (config != null) {
            final Document configDoc = Json
                    .parse(new InputStreamReader(getClass().getResourceAsStream("/demo/" + config)));
            builder.add("config", configDoc);
        }

        final Document element = builder.build();

        elements.insert(element);

        return element.get(ObjectIdElement.class, "_id").getId();
    }

    private ObjectId insertWorkspace(MongoCollection elements, String name, ObjectId... buses) {
        return insertElement(elements, name, Optional.absent(), "workspace", null, buses);
    }

    private ObjectId insertBus(MongoCollection elements, String name, String config, ObjectId... servers) {
        return insertElement(elements, name, Optional.absent(), "petals-bus-5.0", config, servers);
    }

    private ObjectId insertServer(MongoCollection elements, String name, ServerState state, String config,
            ObjectId... compos) {
        return insertElement(elements, name, Optional.of(state), "petals-container-5.0", config, compos);
    }

    private ObjectId insertComponent(MongoCollection elements, String name, CompState state, String config,
            ObjectId... sus) {
        return insertElement(elements, name, Optional.of(state), "bc-soap-4.4.0", config, sus);
    }

    private ObjectId insertSU(MongoCollection elements, String name, SUState state, boolean provides, String config) {
        return insertElement(elements, name, Optional.of(state),
                provides ? "su-provides-soap-4.4.0" : "su-consumes-soap-4.4.0", config);
    }
}
