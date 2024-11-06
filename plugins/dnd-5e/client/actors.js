import { Global } from '@/services/PluginGlobals';

let dndModule = () => Global('dnd-5e').DndModule;

// Aixo proc?

function FetchActors(){
    // Sacame de aqui
    dndModule().socket.on('update-actor-all', () => {
        FetchActors();
    });

    dndModule().router.get('/actor/list', {}).then(response => {
        Global('dnd-5e').Data.game.value.actors = response.data.data;
    }).catch(err => console.log(err));
}

const GetActors = () => Global('dnd-5e').Data.game.value.actors;
const GetActor = (id, callback = () => {}) => {
    dndModule().router.get('/actor/get', {id}).then(response => {
        if(response.data.status == "ok") callback(response.data.data);
        else console.err("Request resulted with error " + response.data.status);
    }).catch(err => console.log(err));
}

const CreateActor = (data, callback = () => {}) => {
    dndModule().router.post('/actor/create', {}, {data}).then(response => {
        FetchActors();
        callback(response.data);
    }).catch(err => console.log(err));
}

const UpdateActor = (id, data, callback = () => {}) => {
    dndModule().router.put('/actor/update', {id}, {data}).then(response => {
        FetchActors();
        callback(response.data);
    }).catch(err => console.log(err));
}

const DeleteActor = (id, callback = () => {}) => {
    dndModule().router.delete('/actor/delete', {id}).then(response => {
        FetchActors();
        callback(response.data);
    });
}

export {
    FetchActors,

    GetActor,
    GetActors,
    CreateActor,
    UpdateActor,
    DeleteActor
}