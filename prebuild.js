const fs = require('fs');
const path = require('path');

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


const outputPath = 'client/public/data/icons.json' 
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

fs.writeFileSync(outputPath, JSON.stringify({files: result}, null, "\t"));

console.log('File list generated successfully!');
console.log("Generated " + iconCount + " icons");

// Locale generation
const locales = [
    './client/src/locale/en.json',
    './client/src/locale/es.json',
    './client/src/locale/ca.json',
];

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

let originalJson = JSON.parse(fs.readFileSync(locales[0]));

for(let i = 1; i < locales.length; i++){
    let data = JSON.parse(fs.readFileSync(locales[i]));
    fs.writeFileSync(locales[i], JSON.stringify(deepMerge(structuredClone(originalJson), data), null, 2));
};
console.log("Updated Locales")