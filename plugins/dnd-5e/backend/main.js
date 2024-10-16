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

    
    dndModule.router.get('/testing', (req, res) => {
        /*
        let item = itemModel.create({
            name: "Test item!",
            type: "The test item"
            })
            */
           res.json({
               status: "ok"
            })
        })
        
    dndModule.router.get('/item/list', (req, res) => {
        const campaign = req.query.campaign;
        itemModel.find({campaign}).select('-data').lean().then(data => {
            res.json({status: "ok", data});
        });
    });

    dndModule.router.post('/item/create', (req, res) => {
        const campaign = req.query.campaign;
        let data = req.body.data;
        
        if(!(data.type && data.name)) {
            res.json({status: "error", msg: "args"});
            return;
        }

        itemModel.create({campaign, type: data.type, name: data.name, info: {}, data: {}}).then(item => {
            dndModule.socket.emit(campaign, 'update-concepts');
            res.json({status: "ok", item});
        });
    });

    dndModule.router.get('/item/get', (req, res) => {
        const campaign = req.query.campaign;
        let id = req.query.id;

        itemModel.findOne({_id: id, campaign}).lean().then(concept => {
            res.json({status: "ok", concept});
        });
    })

    dndModule.router.put('/item/update', (req, res) => {
        const campaign = req.query.campaign;
        let id = req.query.id;
    
        itemModel.findOneAndUpdate({_id: id, campaign}, req.body.concept).then(result => {
            if(req.query.fireUpdate) dndModule.socket.emit(campaign, 'update-concepts');
            dndModule.socket.emit(campaign, 'update-concept', id);
            res.json({status: "ok"});
        });
    })

    Api.socket.on("test", () => console.log("test"));
    // Api.router.createModelRoutes(itemModel, 'item');
}

export { Main, Api };