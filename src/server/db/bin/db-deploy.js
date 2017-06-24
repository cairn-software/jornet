import fs from 'fs';
import path from 'path';

const DB_DEPLOY_DIRECTORY = `${path.dirname(require.main.filename)}/../sql`;

/**
 * Initialize our client to connect to the DB
 */
const client = require('knex')({
  client: 'pg',
  connection: `postgres://${process.env.JORNET_DB_USER}:${process.env.JORNET_DB_PASSWORD}@${process.env.JORNET_DB_HOST}:${process.env.JORNET_DB_PORT}/jornet?connect_timeout=10&application_name=jornet`,
  searchPath: 'knex,public',
});

const runSqlFile = patchFileName => {
  console.log(`Attempting to execute SQL file: ${patchFileName}`);
  const sql = fs.readFileSync(`${DB_DEPLOY_DIRECTORY}/${patchFileName}.sql`, 'utf8');
  return client.raw(sql).then(() => client('schema_patches').insert({patch_file: patchFileName})).catch(e => {
    console.log(`Failed to execute ${patchFileName}`);
    console.error(e);
    process.exit(1);
  });
};

client.schema
  .createTableIfNotExists('schema_patches', table => {
    table.increments();
    table.string('patch_file').notNullable();
    table.timestamp('created_date').notNullable().defaultTo(client.raw('now()'));
  })
  .then(() => client('schema_patches').select())
  .then(patches => patches.map(patch => patch.patch_file))
  .then(alreadyRunPatchNumbers => {
    const allPatches = fs.readdirSync(DB_DEPLOY_DIRECTORY);
    return allPatches
      .map(patchFile => patchFile.substring(0, patchFile.indexOf('.')))
      .filter(patchFile => !alreadyRunPatchNumbers.includes(patchFile))
      .map(patchFile => runSqlFile(patchFile));
  })
  .then(sqlPromises => Promise.all(sqlPromises))
  .then(() => {
    console.log(`Finished`);
    process.exit(0);
  })
  .catch(e => {
    console.log(`Error occurred while attempting to execute new SQL files`);
    console.error(e);
    process.exit(1);
  });
