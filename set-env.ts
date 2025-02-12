const { writeFileSync } = require('fs');
const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,
  api: '${process.env.API_URL || 'http://java.dbperu.com:8080/DBINVENTORY/DbInventory'}'
};`;

writeFileSync(targetPath, envConfigFile);
