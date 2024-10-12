# Creating a plugin

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
```json
{
    "package": "your-plugin",
    "name": "My custom plugin",
    "description": "This is my first custom plugin",
    "authors": [
        {
            "name": "Aran Roig"
        }
    ],
    "version": "1.0",
    "client": {
        "entrypoint": "main.js"
    },
    "backend": {
        "entrypoint": "main.js"
    }
}
```

## Entrypoints

When Dragonroll registers a plugin, it calls the `Main` method of the file specified in the entrypoint field inside the `plugin.json`, so if you don't export a function with that name your plugin won't load. Dragonroll passes its entire API through the main method 

> `client/main.js`
> `backend/main.js`
```js main.js
function Main(Api){
    console.log("Hello World!");
}
export { Main };
```

In the client entrypoint, the `Api` variable will be a `ClientApi` object. In the backend entrypoint, the `Api` will be instead a `BackendApi` object.

If you want to make the `Api` object accessible throught your plugin files, you need to export it and then import `main.js` using relative paths:

> `client/main.js`
> `backend/main.js`
```js main.js
let Api;
function Main(api){
    Api = api;
    console.log("Hello World!");
}
export { Main, Api };
```

> `client/otherfile.js`
```js
import { Api } from './main.js'
// Do whatever
```

## Creating a window

In Dragonroll, windows are managed in a data-oriented approach, each window has a `type` that defines what view corresponds to it, and then it has an `id` to identify every window. These two fields are mandatory for creating a window, and `id` must be unique. For ensuring that `type` and `id` won't collide with other plugins, the Dragonroll Api handles a prefix with the name of your package for all the ids you set.

### Window view

You can spawn Dragonroll internal windows or also you can create your own type with the `registerWindow` method. First, you need to create a view inside `client/views` folder:

> `ExampleWindow.vue`
```vue
<script setup>
import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import WindowHandle from '@/views/partials/WindowHandle.vue';

const handle = ref(null);
const props = defineProps(['data']);
const data = props.data;
let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 380});
    ResetPosition(id, "center");
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <h1>Hello window world!</h1>    
    </div>
</template>

<style scoped></style>
```

There's a lot to unpack here. Each Dragonroll window that is created contains a `data` prop. This contains all the information that has been supplied from the `createWindow` method, including the id and its type. Also, you will see that it has a `WindowHandle` partial. This draws the handle, and the `SetupHandle` function adds internal logic to it.

You should add the body of the window where `<h1>Hello window world!</h1>` is placed.

### Registering the window

Call `registerWindow`, passing the view (without the .vue extension):

```js
let exampleWindowView = Api.createView('ExampleWindow')
let exampleWindow = Api.registerWindow('example_window', exampleWindowView);
```

the first parameter of `registerWindow` is the `type` of the new window that is being registered, and the view is what Dragonroll will spawn as the window.

### Creating the window

```js
Api.createWindow(exampleWindow)
```

Keep in mind that `registerWindow` returns a `String` with the type of the registered window with the plugin prefix appended