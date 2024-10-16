import { FetchConcepts, FetchData, InitData } from "./data";
import { Global } from '@/services/PluginGlobals';

var dndModule;

function Main(Api){
    Global('dnd-5e')['Api'] = Api;
    
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

    Global('dnd-5e').Data = {
        windows: {
            character_sheet: Api.registerWindow('character_sheet', Api.createView('CharacterSheet')),
            item_sheet: Api.registerWindow('item_sheet', Api.createView('ItemSheet')),
            create_item_prompt: Api.registerWindow('create_item_prompt', Api.createView('CreateItemPrompt'))
        }
    }

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

    dndModule.onInit = () => {
        InitData();
        FetchData();
    }

    Api.registerModule(dndModule);


    Global('dnd-5e')['dndModule'] = dndModule;
}

export { 
    Main
};