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

fs.writeFileSync(outputPath, JSON.stringify({files: result}, null, 2));

console.log('File list generated successfully!');
console.log("Generated " + iconCount + " icons");