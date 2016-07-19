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
import java.io.Writer;

import org.eclipse.jdt.annotation.Nullable;

import com.allanbank.mongodb.bson.element.JsonSerializationVisitor;

/**
 * This was fixed upstream but not released yet: the default serializer does not output strict json.
 * 
 * TODO use upstream version (when released): https://github.com/allanbank/mongodb-async-driver/issues/12
 * 
 * @author vnoel
 *
 */
public class StrictJsonSerializationVisitor extends JsonSerializationVisitor {

    private Writer mySink;

    public StrictJsonSerializationVisitor(Writer sink, boolean oneLine) {
        super(sink, oneLine);
        this.mySink = sink;
    }

    /**
     * names should always be written with quote (until a new version of the mongodb driver is released)
     */
    @Override
    protected void writeName(@Nullable String name) throws IOException {
        if (!isSuppressNames()) {
            writeQuotedString(name);
            mySink.write(" : ");
        }
    }

    /**
     * string should be enclosed in double quotes, not simple!
     */
    @Override
    protected void writeQuotedString(@Nullable String string) throws IOException {
        mySink.write('"');
        // Escape any embedded double quotes.
        mySink.write(string == null ? null : string.replaceAll("\"", "\\\\\""));
        mySink.write('"');
    }

}
