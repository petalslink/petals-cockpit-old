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

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.validation.Valid;

import org.eclipse.jdt.annotation.Nullable;
import org.hibernate.validator.constraints.NotEmpty;

import com.allanbank.mongodb.bson.Document;
import com.allanbank.mongodb.bson.json.Json;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

/**
 * Read from modules (for now there is none but the main one provided in resources) configuration YAML
 * 
 * @author vnoel
 *
 */
public class WorkspaceElementConfiguration {

    private final Map<String, Type> types;

    private final Map<String, Conf> configurations = new HashMap<>();

    @JsonCreator
    public WorkspaceElementConfiguration(@JsonProperty("types") Map<String, Type> types,
            @JsonProperty("configurations") Map<String, List<Conf>> configurations) {
        this.types = types;
        for (final Entry<String, Type> e : types.entrySet()) {
            e.getValue().setName(e.getKey());
        }
        for (final Entry<String, List<Conf>> e : configurations.entrySet()) {
            final List<Conf> confs = e.getValue();
            this.configurations.put(e.getKey(), new Conf(e.getKey(), confs));
            populateType(confs);
        }
    }

    private void populateType(List<Conf> confs) {
        for (final Conf conf : confs) {
            conf.setType(types.get(conf.getName()));
            populateType(conf.getContains());
        }
    }

    @Nullable
    public Type getType(String name) {
        return types.get(name);
    }

    public boolean existsType(String name) {
        return types.containsKey(name);
    }
    
    @Nullable
    public Conf getConfiguration(String name) {
        return configurations.get(name);
    }
    
    public static class Type {
        
        private String name = "";

        @NotEmpty
        @JsonProperty
        private String icon = "";

        @NotEmpty
        @JsonProperty
        private String state = "";

        @Nullable
        private Document defaultConfig;

        @JsonProperty("default-config")
        void setDefaultConfig(JsonNode defaultConfig) {
            this.defaultConfig = Json.parse(defaultConfig.toString());
        }

        void setName(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

        public String getIcon() {
            return icon;
        }

        public String getState() {
            return state;
        }

        @Nullable
        public Document getDefaultConfig() {
            return defaultConfig;
        }
    }

    @JsonInclude(Include.NON_NULL)
    public static class Conf {

        @NotEmpty
        @JsonProperty
        private String name = "";

        @Valid
        @JsonProperty
        private List<Conf> contains = Collections.emptyList();

        @Nullable
        private Type type;

        public Conf() {
            // used by jackson
        }

        Conf(String name, List<Conf> contains) {
            this.name = name;
            this.contains = contains;
        }

        public String getName() {
            return name;
        }

        public List<Conf> getContains() {
            return contains;
        }

        public void setType(Type type) {
            this.type = type;
        }

        @Nullable
        public Type getType() {
            return type;
        }
    }
}