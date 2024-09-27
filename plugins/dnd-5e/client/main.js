// TODO: We should move client/plugin.json to plugin.json and generate the client plugin.json
// with the prebuild.js

function Main(Api){
    console.log("Hello World!");
    console.log(Api);

    Api.Modules.CreateModule({
        "id": "dnd-5e",
        "title": "Dungeons & Dragons 5e",
        "description": "Dungeons & Dragons Fifth edition game system support",
        "authors": [
            {
                "name": "Aran Roig"
            }
        ],
        "version": "1.0.0",
        "color": "#e92026"
    });

    Api.Windows.InjectWindow('dnd-5e', 'character_sheet', 'CharacterSheet');
    Api.Windows.InjectWindow('dnd-5e', 'item_sheet', 'ItemSheet');
    Api.Windows.InjectWindow('dnd-5e', 'create_item_prompt', 'CreateItemPrompt');
}

export { Main };