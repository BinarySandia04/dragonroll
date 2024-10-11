This guide will help you through creating a plugin for Dragonroll

## Downloading the example plugin

The quickest way to start a plugin is starting from the example plugin template that you can find in [this]() repository. Every Dragonroll plugin has the following file structure:

```tree
/your-plugin/
├── plugin.json
├── client
│   └── main.js
│   └── ...
├── backend
│   └── main.js
│   └── ...
├── locales
│   └── en-US.json
│   └── ...
└── public
    └── icon.png
    └── ...
```

- The `plugin.json` contains basic information about your plugin, and also the entrypoints that Dragonroll will use to load and initialize the plugin
- The `client` folder contains all the code of your plugin that is relative to the client
- The `backend` folder contains all the code that is relative to the server
- The `locales` folder contains the translation files for your plugin
- The `public` folder contains all the media that will be publicly available for your plugin client 

## The plugin.json file

Your `plugin.json` file defines important information about your plugin, like its name, package, authors, entrypoints, and other information

**Important**: The `package` field must be identical to the name of the folder containing your entire plugin

> `plugin.json`
> ```json
> {
>     "package": "your-plugin",
>     "name": "My custom plugin",
>     "description": "This is my first custom plugin",
>     "authors": [
>         {
>             "name": "Aran Roig"
>         }
>     ],
>     "version": "1.0",
>     "client": {
>         "entrypoint": "main.js"
>     },
>     "backend": {
>         "entrypoint": "main.js"
>     }
> }
> ```

## Entrypoints

When Dragonroll registers a plugin, it calls the `Main` method of the file specified in the entrypoint field inside the `plugin.json`, so if you don't export a function with that name your plugin won't load. Dragonroll passes its entire API through the main method 

> `client/main.js` and `backend/main.js`
> ```js main.js
> function Main(Api){
>     console.log("Hello World!");
> }
> export { Main };
> ```

In the client entrypoint, the `Api` variable will be a `ClientApi` object. In the backend entrypoint, the `Api` will be instead a `BackendApi` object.