If you want to use some view or partial of the Dragonroll source in your plugin,
you must do it from the "@" root. "@" represents the root of the `/src` directory of the client of Dragonroll, so for example, if you want to import the Dragonroll markdown
editor in your own views you should add:

```js
import MarkdownEditor from '@/views/partials/MarkdownEditor.vue';
```