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
package org.ow2.petals.cockpit.server.utils;

import java.io.IOException;

import org.eclipse.jdt.annotation.NonNull;
import org.eclipse.jdt.annotation.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.allanbank.mongodb.bson.DocumentAssignable;
import com.allanbank.mongodb.bson.json.Json;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

public class DocumentAssignableDeserializer extends StdDeserializer<DocumentAssignable> {

    private static final Logger LOG = LoggerFactory.getLogger(DocumentAssignableDeserializer.class);

    private static final long serialVersionUID = -3793512274350222890L;

    public DocumentAssignableDeserializer() {
        super(DocumentAssignable.class);
    }

    @Override
    public @NonNull DocumentAssignable deserialize(@Nullable JsonParser p, @Nullable DeserializationContext ctxt)
            throws IOException, JsonProcessingException {
        assert p != null;
        assert ctxt != null;

        return Json.parse(p.readValueAsTree().toString());
    }

}
