// In this file you can configure migrate-mongo

const config = {
    mongodb: {
        url: 'mongodb://localhost:27017',

        databaseName: 'nodeInternship',

        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },

    migrationsDir: 'migrations',

    changelogCollectionName: 'changelog',

    migrationFileExtension: '.js',

    useFileHash: false,

    moduleSystem: 'commonjs',
};

module.exports = config;
