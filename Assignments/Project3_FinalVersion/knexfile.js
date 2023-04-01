module.exports = {

    development: {
        client: 'pg',
        connection: {
        host : 'localhost',
        user : 'postgres',
        password : 'admin',
        database : 'proj2',
        port: 5432
        },
        migrations: {
        directory: __dirname + '/knex/migrations',
        },
        seeds: {
        directory: __dirname + '/knex/seeds'
        }
    },
    // const knex = require("knex")(
    //     {
    //         client: 'pg',
    //         connection: {
    //             host : "localhost",
    //             user : "postgres",
    //             // this needs to be the password
    //             password : "admin",
    //             database : "proj2",
    //             port : 5432
    //         }
    //     }
    // );
    
    production: {
        client: 'pg',
        connection: {
            connectionString : process.env.DATABASE_URL,
            ssl: {
            rejectUnauthorized: false
            }
        },  
        migrations: {
        directory: './knex/migrations',
        tableName: 'knex_migrations',
        },
        seeds: {directory: './knex/seeds'},
    }
    
    }; 