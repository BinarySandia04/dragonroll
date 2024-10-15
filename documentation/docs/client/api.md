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

### onExit

### setButtons

### router

## ClientRouter

### get

### post

### put

### delete

### baseGet

### basePost

### basePut

### baseDelete

## ClientSocket

### on

## ClientView

### path

## WindowType

## WindowData