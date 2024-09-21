import './assets/main.css'
import './assets/prism.css'

import { createApp, defineComponent, reactive } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import EN from './locale/en.json'
import ES from './locale/es.json'

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

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en: EN,
        es: ES,
    }
});

app.use(router)
app.use(i18n);

app.mount('#app')

