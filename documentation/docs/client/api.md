# Client Api

## ClientApi

The ClientApi object is used for interacting with everything related to the Dragonroll client. It is passed to the `Main` function at the entrypoint defined in the [plugin.json](/plugin/plugin.json) file


### createView

Creates a [ClientView](#clientview) object from a Vue view defined inside the  `client/views` folder

#### Parameters

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``path`` | String | yes | The path relative from `client/views` to the Vue view without the `.vue` extension |

### Returns

| Type | Description |
| ---- | ----------- |
| [ClientView](#clientview) | The new created view |

#### Example

```js
// Supposing that we have /your-plugin-root/client/views/Calculator.vue
let calculatorView = Api.createView('Calculator');
```

### createModule

Creates a [ClientModule](#clientmodule). The module needs to be later registered with the [registerModule](#registermodule) method to be loaded by Dragonroll. See [creating a module]()

#### Parameters

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``id`` | String | yes | The identifier of the new module |

#### Returns

| Type | Description |
| ---- | ----------- |
| [ClientModule](#clientmodule) | The new ClientModule |

#### Example

```js
let dndModule = Api.createModule('dnd-5e');
dndModule.title = "Dungeons & Dragons 5e";
dndModule.description = "Dungeons & Dragons Fifth edition module";
dndModule.version = "1.0";
dndModule.color = "#e92026";
dndModule.icon = "icon.png";
```

### createWindow

This method instances a new window from an already registered one. You can also pass custom parameters inside this method and then read them from your view.

#### Parameters

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``type`` | String ([WindowType]()) | yes | The type of the new window |
| ``data`` | Object ([WindowData]()) | no | Aditional data for the created window |

#### Example

```js
let databaseWindow = Api.registerWindow('database', Api.createView('Database'));

// Opens the database window
Api.createWindow(databaseWindow, {
  id: 'my-database-window',
  title: "My Database",
  custom: [
    {
      data: "This is custom data"
    }
  ]
})
```

### clearWindow

Clears the window with the specified id

#### Parameters

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``id`` | String  | yes | The id of the window to clear |

#### Example

```js
Api.createWindow(databaseWindow, {
  id: 'my-database-window',
  title: "My Database",
  close: () => {
    // When the close button is pressed, clear the window
    Api.clearWindow('my-database-window');
  }
})
```


### registerModule

Registers an already created [module](#clientmodule) to Dragonroll

#### Parameters

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``module`` | [ClientModule](#clientmodule) | yes | The module to register |

#### Example

```js
let dndModule = Api.createModule('dnd-5e');
...
api.registerModule(dndModule);
```

### registerWindow

Registers a new window to Dragonroll and returns the registered id

#### Parameters

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``name`` | String | yes | The name of the new window |
| ``view`` | [ClientView](#clientview) | yes | The view that contains the window |

#### Returns

| Type | Description |
| ---- | ----------- |
| String ([WindowType](#windowpath)) | The registered type of window |

#### Example

```js
let databaseWindow = Api.registerWindow('database', Api.createView('Database'));
```

### router

Gets the router object associated with the API. It has no prefix and can make all kinds of calls to the Dragonroll backend

#### Returns

| Type | Description |
| ---- | ----------- |
| [ClientRouter](#clientrouter) | The client router |

### baseRouter

Gets the royter object associated with the API. It has no prefix and can make all kinds of calls to the Dragonroll backend.

| Type | Description |
| ---- | ----------- |
| [ClientRouter](#clientrouter) | The client router from root |

### socket

Gets the socket object associated with the Plugin.

#### Returns

| Type | Description |
| ---- | ----------- |
| [ClientSocket](#clientsocket) | The client socket |

## ClientModule

### setData

Sets the information data displayed in Dragonroll of the current module

#### Parameters

This method accepts an Object type with the following properties:

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``title`` | String | yes | The display name of the module |
| ``description`` | String | yes | The description of the module |
| ``version`` | String | yes | The version of the module |
| ``color`` | String | yes | The display color for the module |
| ``authors`` | [Author] | no | The authors of the module |
| ``icon`` | String | yes | The icon to be displayed with the module. Relative to the `public` folder |


#### Example

```js
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
```

### onInit

Sets a callback when the module is instantiated, i.e, when the client enters a campaign using that module

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``callback`` | Function() | yes | The function to call when the module is instantiated |


### onExit

Sets a callback when the module instance is destroyed, i.e, when the user leaves a game with a campaign using that module

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``callback`` | Function() | yes | The function to call when the module is destroyed |

### setButtons

### router

Gets the [ClientRouter](#clientrouter) associated with that module. The paths of this router can be easily catched by the same BackendRouter associated with the module with the same id.

#### Returns

| Type | Description |
| ---- | ----------- |
| [ClientRouter](#clientrouter) | The router associated with the module |

### socket

Gets the [ClientSocket](#clientsocket) object associated with the Module.

#### Returns

| Type | Description |
| ---- | ----------- |
| [ClientSocket](#clientsocket) | The module socket |

### baseSocket

Gets the [ClientSocket](#clientsocket) pointing to the root of the application. Use it only for calling internal socket.io events of Dragonroll.

#### Returns

| Type | Description |
| ---- | ----------- |
| [ClientSocket](#clientsocket) | The socket object |

## ClientRouter

The `ClientRouter` class is used to make http requests between the Dragonroll client and the Dragonroll backend. To make the routing process easier, Dragonroll provides different instances of the `ClientRouter` class depending on the context. For example, you can have a ClientRouter for registering routes for an specific module inside your plugin, and another for registering more general routes that you may want to create within the backend part of your plugin. It is also possible to make http requests 
to the internal Dragonroll routes using the `baseRouter` 

### get

#### Parameters

Creates a `GET` request to the backend

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``path`` | String | yes | The path to the route to make the HTTP request |

#### Returns

| Type | Description |
| ---- | ----------- |
| Callback\<Response\> | A callback with data about the result of the request |

### post

#### Parameters

Creates a `POST` request to the backend

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``path`` | String | yes | The path to the route to make the HTTP request |
| ``data`` | Object | no | The body of the request |

#### Returns

| Type | Description |
| ---- | ----------- |
| Callback\<Response\> | A callback with data about the result of the request |

### put

#### Parameters

Creates a `PUT` request to the backend

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``path`` | String | yes | The path to the route to make the HTTP request |
| ``data`` | Object | no | The body of the request |

#### Returns

| Type | Description |
| ---- | ----------- |
| Callback\<Response\> | A callback with data about the result of the request |

### delete


#### Parameters

Creates a `GET` request to the backend

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``path`` | String | yes | The path to the route to make the HTTP request |

#### Returns

| Type | Description |
| ---- | ----------- |
| Callback\<Response\> | A callback with data about the result of the request |

## ClientSocket

### on

## ClientView

### path

## WindowType

## WindowData