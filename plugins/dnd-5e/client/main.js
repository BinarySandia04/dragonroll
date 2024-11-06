import { reactive } from 'vue';

import { Global } from '@/services/PluginGlobals';
import { FetchItems, GetItems } from "./items";
import { FetchActors } from './actors';

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
    let booksWindow = Api.registerWindow('books', Api.createView('Books'))

    Global('dnd-5e').Data = {
        windows: {
            database: databaseWindow,
            actors: actorsWindow,
            booksWindow,
            character_sheet: Api.registerWindow('character_sheet', Api.createView('CharacterSheet')),
            item_sheet: Api.registerWindow('item_sheet', Api.createView('ItemSheet')),
            create_item_prompt: Api.registerWindow('create_item_prompt', Api.createView('CreateItemPrompt'))
        }
    }

    dndModule.setButtons({
        right: [
            {
                id: 'database-button',
                icon: '/icons/iconoir/regular/book.svg',
                action: () => {
                    Api.createWindow(databaseWindow, {
                        title: "Campaign items",
                        id: 'campaign-items-window',
                        fetchConcepts: FetchItems, // Requests reactive ref update 
                        getConcepts: GetItems,     // Needs to return reactive ref value
                        close: () => Api.clearWindow("campaign-items-window")
                    });
                }
            },
            {
                id: 'database-button',
                icon: '/icons/iconoir/regular/bookmark-book.svg',
                action: () => {
                    Api.createWindow(booksWindow, {
                        title: "Books",
                        id: booksWindow,
                        close: () => Api.clearWindow(booksWindow)
                    });
                }
            },
            {
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


    dndModule.onInit = () => {
        InitData();
        console.log("Init Data");
        FetchItems();
        FetchActors();
    }

    Api.registerModule(dndModule);

    Global('dnd-5e').DndModule = dndModule;
}

function InitData(){
    Global('dnd-5e').Data.game = reactive({});
    Global('dnd-5e').Data.game.value = {
        concepts: [],
        actors: [],
    };
}

export { 
    Main
};