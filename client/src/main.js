import './assets/main.css'
import './assets/prism.css'

import { createApp, defineComponent, reactive } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import mitt from 'mitt';
import { GetUser, GetUserSetting, LogoutUser } from './services/User'
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
let locale = 'en-US';

let supportedLocales = ['en-US', 'es-ES', 'ca'];
let navLocale = window.navigator.language;
console.log(navLocale);

if(supportedLocales.includes(navLocale)) locale = navLocale;

try {
    if(GetUser()) locale = await GetUserSetting('lang');
} catch(ex) {
    LogoutUser();
}
console.log(locale);

const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en-US',
    messages: {
        'en-US': (await import(`./locales/en-US.json`)).default,
        'es-ES': (await import(`./locales/es-ES.json`)).default,
        'ca': (await import(`./locales/ca.json`)).default,
    }
});


app.use(router)
app.use(i18n);

app.mount('#app')

