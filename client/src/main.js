import './assets/main.css'
import './assets/prism.css'

import { createApp, defineComponent, reactive } from 'vue'
import App from './App.vue'
import router from './router'

import mitt from 'mitt';
const emitter = mitt();

const app = createApp(App);
app.config.globalProperties.emitter = emitter
app.config.globalProperties.rollWindows = {
    login: reactive([]),
    register: reactive([]),
    test: reactive([]),
    main_menu: reactive([]),
    edit_profile: reactive([]),
};

app.use(router)

app.mount('#app')

