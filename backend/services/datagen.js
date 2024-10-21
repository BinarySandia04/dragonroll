const fs = require('fs');
const { default: mongoose } = require('mongoose');
const path = require('path');

const basePath = path.resolve(__dirname, '../')

const DatagenCollection = require("../models/DatagenCollection");
const DatagenEntry = require('../models/DatagenEntry');

async function datagenTask(models) {
    console.log("Inicializing datagen task");

    await DatagenCollection.deleteMany({});
    await DatagenEntry.deleteMany({});

    const datagenPluginFolders = fs.readdirSync(path.resolve(basePath + '/datagen'));
    datagenPluginFolders.forEach(datagenPluginFolder => {
        const datagenFolders = fs.readdirSync(path.resolve(basePath + '/datagen/' + datagenPluginFolder));
        datagenFolders.forEach(datagenFolder => {
            let folder = basePath + '/datagen/' + datagenPluginFolder + "/" + datagenFolder;
            const datagenInfo = JSON.parse(fs.readFileSync(
                path.resolve(folder + "/datagen.json")
            ));

            resolveDatagen(models, folder, datagenInfo);
        })
    });

    console.log("Ended datagen task");
}

async function resolveDatagen(models, path, info){
    // Do locale translation with info somewhere...?
    const datagenCollection = await DatagenCollection.create({
        name: info.name,       // Display name?
        id: info.id,           // Internal id?
        package: info.package, // From what plugin?
        module: info.module,  // What module is for?
        desc: info.desc,
        icon: info.icon,
    });

    const modelNames = models[info.module].modelNames;
    for(let i = 0; i < modelNames.length; i++){
        let modelName = modelNames[i];
        if(Object.keys(mongoose.models).includes(modelName)){
            let modelLastName = modelName.split('/').pop();
            let modelDataPath = path + "/data/" + modelLastName;
            if(fs.existsSync(modelDataPath)){
                const jsonFiles = fs.readdirSync(path + "/data/" + modelLastName, {recursive: true});
                let modelPath = path + "/data/" + modelLastName;
                for(let j = 0; j < jsonFiles.length; j++){
                    let file = jsonFiles[j];
                    if(fs.lstatSync(modelPath + "/" + file).isFile()){
                        const newDatagen = await appendDatagen(modelPath + "/" + file, modelName, info, datagenCollection);
                        datagenCollection.entries.push(newDatagen._id);
                    }
                }
            }
        }
    };


    await datagenCollection.save();
}

async function appendDatagen(file, modelName, info, datagenCollection){
    // "Appending " + file + " to model " + modelName + " from " + info.id + " for package " + info.package
    let fileData = JSON.parse(fs.readFileSync(file));
    return await DatagenEntry.create({
        id: fileData.id,
        data: fileData.value,
        schema: modelName,
        datagen_collection: datagenCollection
    });
}

module.exports = {
    datagenTask
}