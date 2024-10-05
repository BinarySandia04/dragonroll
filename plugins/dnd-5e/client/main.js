
// Entrypoint
function Main(Api){
    console.log("Hello World!");

    let dndModule = Api.createModule('dnd-5e');

    dndModule.title = "Dungeons & Dragons 5e";
    dndModule.description = "Dungeons & Dragons Fifth edition game system support";
    dndModule.version = "0.1";
    dndModule.color = "#e92026";
    dndModule.icon = "icon.png"

    Api.windows.registerWindow('character_sheet', Api.createView('CharacterSheet'));
    Api.windows.registerWindow('item_sheet', Api.createView('ItemSheet'));
    Api.windows.registerWindow('create_item_promptç', Api.createView('CreateItemPrompt'));

    Api.registerModule(dndModule);
}

export { Main };