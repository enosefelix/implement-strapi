const fs = require('fs');

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DB_HOST', 'localhost'),
        port: env.int('DB_PORT', '5432'),
        database: env('DB_DATABASE', 'expense'),
        username: env('DB_USERNAME', 'admin'),
        password: env('DB_PASSWORD', 'changeme'),
        ssl: env.bool('DB_SSL', false) && {
          ca: fs.readFileSync(env('DB_SSL_PATH')).toString(),
        },
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
