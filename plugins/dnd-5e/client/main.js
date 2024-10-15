import { FetchConcepts, FetchData, InitData } from "./data";

// Entrypoint
let Api;
let dndModule;

function Main(api){
    Api = api

    
    console.log("Module registered!");
    dndModule = Api.createModule('dnd-5e');

    dndModule.setData({
        title: "Dungeons & Dragons 5e",
        description: "Dungeons & Dragons Fifth edition game system support",
        version: "0.1",
        color: "#e92026",
        authors: [{
            name: "Aran Roig",
            webpage: "aranroig.com"  
        }],
        icon: "icon.png"
    });

    let databaseWindow = Api.registerWindow('database', Api.createView('Database'));
    let actorsWindow = Api.registerWindow('actors', Api.createView('Actors'));

    let characterSheetWindow = Api.registerWindow('character_sheet', Api.createView('CharacterSheet'));
    let itemSheetWindow = Api.registerWindow('item_sheet', Api.createView('ItemSheet'));
    let createItemPromptWindow = Api.registerWindow('create_item_prompt', Api.createView('CreateItemPrompt'));

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
    

    Api.socket.on('update-concepts', () => {
        FetchConcepts();
    });


    // Api.windows.registerWindow('character_sheet', Api.createView('CharacterSheet'));
    // Api.windows.registerWindow('item_sheet', Api.createView('ItemSheet'));
    // Api.windows.registerWindow('create_item_prompt', Api.createView('CreateItemPrompt'));

    dndModule.onInit = () => {
        InitData();
        FetchData();
    }

    Api.registerModule(dndModule);


}

export { 
    Main,
    Api,
    dndModule
};