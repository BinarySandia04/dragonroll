import './assets/main.css'
import './assets/prism.css'

import { createApp, defineComponent, reactive } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import EN from './locale/en.json'
import ES from './locale/es.json'
import CA from './locale/ca.json'

import mitt from 'mitt';
import { GetUser, GetUserSetting } from './services/User'
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

// Determinem el locale
let locale = 'en';
if(GetUser()) locale = await GetUserSetting('lang');
console.log(locale);

const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages: {
        en: EN,
        es: ES,
        ca: CA
    }
});

app.use(router)
app.use(i18n);

app.mount('#app')

