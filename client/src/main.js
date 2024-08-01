import './assets/main.css'
import './assets/prism.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import mitt from 'mitt';
const emitter = mitt();

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
import esEs from '@kangc/v-md-editor/lib/lang/es-ES' 


import Prism from 'prismjs';

import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-bash';


VueMarkdownEditor.lang.use('es-Es', esEs);
VueMarkdownEditor.use(vuepressTheme, { Prism }); 
VueMarkdownEditor.use(createKatexPlugin());

const app = createApp(App).use(VueMarkdownEditor);


app.config.globalProperties.emitter = emitter;

app.use(router)

app.mount('#app')