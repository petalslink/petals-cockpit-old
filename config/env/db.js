'use strict';

module.exports = {
    database: {
        name: 'petals-database',
        description: 'Connect with file configMongoDB to petals-database with default config',
        connector: 'mongodb',
        host: '127.0.0.1',
        collection: 'sessions',
        database: 'petals-database',
        url: 'mongodb://localhost,localhost:27017/petals-database',
        username: 'SuperAdmin',
        password: 'stage2015',
        port: 27017
    }
};

