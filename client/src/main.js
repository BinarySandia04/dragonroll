import './assets/main.css'
import './assets/prism.css'

import { createApp, defineComponent, reactive } from 'vue'
import i18n from '@/services/i18n'

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


console.clear();
console.log("%cLoaded!!!", "color: #22ff22; font-size: 24px");


app.use(router)
app.use(i18n);

app.mount('#app')

