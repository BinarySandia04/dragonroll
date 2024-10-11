
// Entrypoint
function Main(Api){
    console.log("Hello World!");

    let dndModule = Api.createModule('dnd-5e');

    dndModule.title = "Dungeons & Dragons 5e";
    dndModule.description = "Dungeons & Dragons Fifth edition game system support";
    dndModule.version = "0.1";
    dndModule.color = "#e92026";
    dndModule.icon = "icon.png";

    let databaseWindow = Api.registerWindow('database', Api.createView('Database'));
    let actorsWindow = Api.registerWindow('actors', Api.createView('Actors'));

    /*
    let characterSheetWindow = Api.registerWindow('character_sheet', Api.createView('CharacterSheet'));
    let itemSheetWindow = Api.registerWindow('item_sheet', Api.createView('ItemSheet'));
    let createItemPromptWindow = Api.registerWindow('create_item_prompt', Api.createView('CreateItemPrompt'));

    dndModule.setCharacterSheet(Api.createView('CharacterSheet'));
    dndModule.setItemSheet(Api.createView('ItemSheet'));
    dndModule.setItemPrompt(Api.createView('CreateItemPrompt'));
    */

    dndModule.setButtons({
        right: [
            {
                id: 'database-button',
                icon: '/icons/iconoir/regular/bookmark-book.svg',
                action: () => {
                    Api.createWindow(databaseWindow, {
                        title: "Database",
                        id: databaseWindow,
                        close: () => Api.clearWindow(databaseWindow)
                    });
                }
            }, {
                id: 'group-button',
                icon: '/icons/iconoir/regular/group.svg',
                action: () => {
                    Api.createWindow(actorsWindow, {
                        title: "Actors",
                        id: actorsWindow,
                        close: () => Api.clearWindow(actorsWindow)
                    });
                }
            }]
    });
    
    // Api.windows.registerWindow('character_sheet', Api.createView('CharacterSheet'));
    // Api.windows.registerWindow('item_sheet', Api.createView('ItemSheet'));
    // Api.windows.registerWindow('create_item_prompt', Api.createView('CreateItemPrompt'));

    Api.registerModule(dndModule);
}

export { Main };