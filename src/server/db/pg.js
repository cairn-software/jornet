const client = require('knex')({
  client: 'pg',
  connection: `postgres://${process.env.JORNET_DB_USER}:${process.env.JORNET_DB_PASSWORD}@${process.env.JORNET_DB_HOST}:${process.env.JORNET_DB_PORT}/jornet?connect_timeout=10&application_name=jornet`,
  searchPath: 'knex,public',
});

export default client;
