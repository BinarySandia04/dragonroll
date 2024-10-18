// Entrypoint
let Api;

function Main(api){
    Api = api;

    // Create our module in the backend. We only need the package name, it must be equal to the one that
    // we made inside the client
    let dndModule = Api.createModule('dnd-5e');

    let itemModel = Api.createModel("item", {
        name: { type: "String", required: true, default: "New item"},
        type: { type: "String", required: true, default: "Item" },
        info: { type: "Object" }, // For preview only
        data: { type: "Object" }, // Advanced item
        book: { type: "ObjectId", ref: "Book"}
    });

    let entityDataModel = Api.createModel('entitydata', {
        name: { type: "String", required: true },
        hp: { type: "Number", required: true },
        max_hp: { type: "Number", required: true },
        effects: [ { type: "ObjectId", ref: "dnd-5e/effect" } ],
        attributes: { type: "Object" }, // {str, dex, ...}
        saving_attributes: {type: "Object"},
        skill_prof: { type: "Object" },
        initiative: { type: "Number" },
        speed: {type: "Number" },
        ac: {type: "Number"},
        proficency: { type: "Number" },
        size: {type: "String"},
        items: [ {type: "ObjectId", ref: 'dnd-5e/item'} ],
        competences: {type: "Object"},
        resources: {type: "Object"},
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
        picture: { type: "String" },
        xp: { type: "Number", required: true },
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

    // Api.socket.on("test", () => console.log("test"));
    // Api.router.createModelRoutes(itemModel, 'item');
}

export { Main, Api };