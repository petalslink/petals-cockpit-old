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

import org.eclipse.jdt.annotation.Nullable;

import com.allanbank.mongodb.bson.DocumentAssignable;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class DocumentAssignableSerializer extends StdSerializer<DocumentAssignable> {

    private static final long serialVersionUID = 6274585714855435189L;

    public DocumentAssignableSerializer() {
        super(DocumentAssignable.class);
    }

    @Override
    public void serialize(DocumentAssignable value, @Nullable JsonGenerator gen, @Nullable SerializerProvider provider)
            throws IOException {
        assert gen != null;
        assert provider != null;

        gen.writeRawValue(StrictJson.serialize(value));
    }

}
