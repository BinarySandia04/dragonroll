// Entrypoint
let Api;

function Main(api){
    Api = api;
    
    console.log("Hello World from backend!");

    // Create our module in the backend. We only need the package name, it must be equal to the one that
    // we made inside the client
    let dndModule = Api.createModule('dnd-5e');

    let itemModel = Api.createModel("item", {
        name: { type: "String", required: true, default: "New Concept"},
        type: { type: "String", required: true, default: "Concept" },
        info: { type: "Object" }, // For preview only
        data: { type: "Object" }, // Advanced item
        book: { type: "ObjectId", ref: "Book"},
        campaign: { type: "ObjectId", ref: "Campaign"},
    });

    dndModule.router.get('/test', (req, res) => {
        console.log("FUNCIONA!!!!");
    })

    // Api.router.createModelRoutes(itemModel, 'item');
}

export { Main, Api };