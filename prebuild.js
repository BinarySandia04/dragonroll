/*
DRAGONROLL PREBUILD SCRIPT
*/

const fs = require('fs');
const path = require('path');

const plugins = fs.readdirSync('./plugins')

// #region icons
const folderPaths = [
    './client/public/icons/weapons',
    './client/public/icons/equipment',
    './client/public/icons/consumables',
    './client/public/icons/magic',
    './client/public/icons/skills',
    './client/public/icons/sundries',
    './client/public/icons/tools',
    './client/public/icons/commodities',
    './client/public/icons/containers',
    './client/public/icons/creatures',
    './client/public/icons/environment',
];


const outputPath = 'client/public/data/data.json'
fs.mkdirSync('client/public/data', { recursive: true });
fs.mkdirSync('client/src/locales', { recursive: true });

let result = [];

let iconCount = 0;
for(let i = 0; i < folderPaths.length; i++){
    const files = fs.readdirSync(folderPaths[i], { recursive: true });
    for(let j = 0; j < files.length; j++){
        let absPath = folderPaths[i] + "/" + files[j]
        if(fs.lstatSync(absPath).isFile()){
            result.push({
                path: absPath.replace(/^(\.\/client\/public\/)/,""),
                name: path.parse(absPath).name
            });
            iconCount++;
        }
    }
};

let icons = {files: result};

console.log('File list generated successfully!');
console.log("Generated " + iconCount + " icons");

// #endregion
// #region locales

const locales = fs.readdirSync("./locales");

function deepMerge(obj1, obj2) {
    for (let key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
          obj1[key] = deepMerge(obj1[key], obj2[key]);
        } else {
          obj1[key] = obj2[key];
        }
      }
    }
    return obj1;
}

let originalJson = JSON.parse(fs.readFileSync("./locales/en-US.json"));
for(let i = 0; i < locales.length; i++){
    let data = JSON.parse(fs.readFileSync("./locales/" + locales[i]));
    fs.writeFileSync("./locales/" + locales[i], JSON.stringify(deepMerge(structuredClone(originalJson), data), null, 2));
};

for(let i = 0; i < locales.length; i++){
  let originalLocale = JSON.parse(fs.readFileSync('./locales/' + locales[i]));
  for(let j = 0; j < plugins.length; j++){
    if(fs.existsSync(`./plugins/${plugins[j]}/locales/${locales[i]}`)){
      let pluginLocale = JSON.parse(fs.readFileSync(`./plugins/${plugins[j]}/locales/${locales[i]}`));
      let mergeJson = {plugins: {}};
      mergeJson.plugins[plugins[j]] = pluginLocale;
      originalLocale = deepMerge(originalLocale, mergeJson);
    }
  }
  fs.writeFileSync("./client/src/locales/" + locales[i], JSON.stringify(originalLocale, null, 2));
}


console.log("Updated Locales")
// #endregion
// #region plugins

for(let j = 0; j < plugins.length; j++){
  if(fs.existsSync(`./plugins/${plugins[j]}/client/`)){
    fs.cpSync(`./plugins/${plugins[j]}/client/`, `./client/plugins/${plugins[j]}`, {recursive: true});
    fs.copyFileSync(`./plugins/${plugins[j]}/plugin.json`, `./client/plugins/${plugins[j]}/plugin.json`);
  }

  if(fs.existsSync(`./plugins/${plugins[j]}/public/`)){
    fs.cpSync(`./plugins/${plugins[j]}/public/`, `./client/public/plugins/${plugins[j]}`, {recursive: true});
  }
}

fs.writeFileSync(outputPath, JSON.stringify({
  icons,
  plugins
}, null, "\t"));
console.log("Installed plugins")
// #endregion