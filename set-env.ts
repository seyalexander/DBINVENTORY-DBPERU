const { writeFileSync } = require('fs');
const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,
  api: '${process.env.api || '/DBINVENTORY/DbInventory'}',
  apiRuc: '${process.env.API_URL || '/ApiRucBDInv/Consulta'}'
};`;

writeFileSync(targetPath, envConfigFile);
