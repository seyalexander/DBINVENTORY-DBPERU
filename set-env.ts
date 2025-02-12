const { writeFileSync } = require('fs');
const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,
  api: '${process.env.API_URL || '/DBINVENTORY/DbInventory'}'
};`;

writeFileSync(targetPath, envConfigFile);
