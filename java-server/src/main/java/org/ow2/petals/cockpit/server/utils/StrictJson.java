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

import java.io.StringWriter;
import java.io.Writer;

import com.allanbank.mongodb.bson.DocumentAssignable;
import com.allanbank.mongodb.bson.json.Json;
import com.allanbank.mongodb.error.JsonException;

/**
 * See {@link Json} and {@link StrictJsonSerializationVisitor}.
 * 
 * @author vnoel
 *
 */
public class StrictJson {

    private StrictJson() {
        // helper class
    }

    public static String serialize(final DocumentAssignable document) throws JsonException {
        final StringWriter writer = new StringWriter();

        serialize(document, writer);

        return writer.toString();
    }

    public static void serialize(final DocumentAssignable document, final Writer sink) throws JsonException {
        final StrictJsonSerializationVisitor visitor = new StrictJsonSerializationVisitor(sink, true);
        document.asDocument().accept(visitor);
    }

}
