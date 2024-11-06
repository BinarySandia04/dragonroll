// Entrypoint
let Api;

function Main(api){
    Api = api;

    // Create our module in the backend. We only need the package name, it must be equal to the one that
    // we made inside the client
    let dndModule = Api.createModule('dnd-5e');

    let itemModel = Api.createModel("item", {
        name: { type: "String", required: true, default: "New item"},
        description: { type: "String", default: "New description" },
        type: { type: "String", required: true, default: "Item" },
        icon: { type: "String" },
        rarity: { type: "String", default: "" },
        quantity: { type: "Number", default: "1" },
        weight: { type: "Number", default: "0" },
        price: { type: "Number", default: "0" },
        data: { type: "Object" }, // Advanced properties depending on item type
    });

    let entityDataModel = Api.createModel('entitydata', {
        name: { type: "String", required: true, default: "New Entity" },
        hp: { type: "Number", required: true, default: 5 },
        max_hp: { type: "Number", required: true, default: 5 },
        effects: [ { type: "ObjectId", ref: "dnd-5e/effect" } ],
        attributes: { type: "Object" }, // {str, dex, ...}
        saving_attributes: {type: "Object"},
        skill_prof: { type: "Object" },
        initiative: { type: "Number", required: true, default: 10 },
        speed: {type: "Number", required: true, default: 30 },
        ac: {type: "Number", required: true, default: 10},
        proficency: { type: "Number", required: true, default: 0 },
        size: {type: "String", required: true, default: "Medium" },
        items: [ {type: "ObjectId", ref: 'dnd-5e/item'} ],
        competences: {type: "Object" },
        resources: {type: "Object" },
        class: { type: "ObjectId", ref: "dnd-5e/progressable" },
        race: { type: "ObjectId", ref: "dnd-5e/progressable" },
        lvl: { type: "Number" },
        desc: { type: "String" },
        token: { type: "Object" }
    });

    let monsterModel = Api.createModel('monster', {
        hp_formulae: { type: "String", required: true },
        cr: { type: "Number" },
        xp_drop: { type: "Number" }
    }, entityDataModel);

    let actorModel = Api.createModel('actor', {
        picture: { type: "String", default: "" },
        xp: { type: "Number", required: true, default: 0 },
        death_throws: { type: "Object" }
    }, entityDataModel);

    let tableModel = Api.createModel('table', {
        name: { type: "String", required: true },
        info: { type: "Object" }
    });

    let progressableModel = Api.createModel('progressable', {
        name: { type: "String", required: true },
        type: { type: "String", required: true },
        icon: { type: "String", required: true },
        resources: { type: "Object" },
        tables: [ { type: "ObjectId", ref: "dnd-5e/table" } ],
        rewards: { type: "Object" }
    });

    let effectsModel = Api.createModel('effect', {
        name: { type: "String", required: true },
        icon: { type: "String", required: true },
        desc: { type: "String" }
    });

    let entityModel = Api.createModel('entity', {
        data: { type: "ObjectId" },
        position: { type: "Object" }
    });

    dndModule.createModelRoutes(itemModel);
    dndModule.createModelRoutes(monsterModel);
    dndModule.createModelRoutes(actorModel);
    dndModule.createModelRoutes(tableModel);
    dndModule.createModelRoutes(progressableModel);
    dndModule.createModelRoutes(effectsModel);
    dndModule.createModelRoutes(entityModel);

    Api.registerDatagen(itemModel);
    Api.registerDatagen(monsterModel);
    Api.registerDatagen(actorModel);
    Api.registerDatagen(tableModel);
    Api.registerDatagen(progressableModel);
    Api.registerDatagen(effectsModel);

    // Api.socket.on("test", () => console.log("test"));
    // Api.router.createModelRoutes(itemModel, 'item');
}

export { Main, Api };