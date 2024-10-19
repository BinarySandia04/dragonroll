const fs = require('fs');
const { default: mongoose } = require('mongoose');
const path = require('path');

const basePath = path.resolve(__dirname, '../')

async function datagenTask(models) {
    console.log("Inicializing datagen task");

    const datagenPluginFolders = fs.readdirSync(path.resolve(basePath + '/datagen'));
    datagenPluginFolders.forEach(datagenPluginFolder => {
        const datagenFolders = fs.readdirSync(path.resolve(basePath + '/datagen/' + datagenPluginFolder));
        datagenFolders.forEach(datagenFolder => {
            console.log(datagenFolder);
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
    const modelNames = models[info.package].modelNames;
    modelNames.forEach(modelName => {
        if(Object.keys(mongoose.models).includes(modelName)){
            let modelLastName = modelName.split('/').pop();
            let modelDataPath = path + "/data/" + modelLastName;
            if(fs.existsSync(modelDataPath)){
                const jsonFiles = fs.readdirSync(path + "/data/" + modelLastName, {recursive: true});
                let modelPath = path + "/data/" + modelLastName;
                jsonFiles.forEach(file => {
                    if(fs.lstatSync(modelPath + "/" + file).isFile()){
                        appendDatagen(modelPath + "/" + file, modelName, info);
                    }
                })
            }
        }
    })
}

async function appendDatagen(file, modelName, info){
    // "Appending " + file + " to model " + modelName + " from " + info.id + " for package " + info.package
}

module.exports = {
    datagenTask
}