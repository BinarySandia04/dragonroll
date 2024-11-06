import { Global } from '@/services/PluginGlobals';

let dndModule = () => Global('dnd-5e').DndModule;

function FetchItems(){
    // Sacame de aqui
    dndModule().socket.on('update-item-all', () => {
        FetchItems();
    });

    dndModule().router.get('/item/list', {}).then(response => {
        Global('dnd-5e').Data.game.value.items = response.data.data;
    }).catch(err => console.log(err));
}

const GetItems = () => Global('dnd-5e').Data.game.value.items;
const GetItem = (id, callback = () => {}) => {
    dndModule().router.get('/item/get', {id}).then(response => {
        if(response.data.status == "ok") callback(response.data.data);
        else console.err("Request resulted with error " + response.data.status);
    }).catch(err => console.log(err));
}

const CreateItem = (data, callback = () => {}) => {
    dndModule().router.post('/item/create', {}, {data}).then(response => {
        FetchItems();
        callback(response.data);
    }).catch(err => console.log(err));
}

const UpdateItem = (id, data, callback = () => {}) => {
    dndModule().router.put('/item/update', {id}, {data}).then(response => {
        FetchItems();
        callback(response.data);
    }).catch(err => console.log(err));
}

const DeleteItem = (id, callback = () => {}) => {
    dndModule().router.delete('/item/delete', {id}).then(response => {
        FetchItems();
        callback(response.data);
    });
}

export {
    FetchItems,

    GetItems,
    GetItem,
    CreateItem,
    UpdateItem,
    DeleteItem
}