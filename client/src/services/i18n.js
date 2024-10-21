import { createI18n } from 'vue-i18n'

import { GetUser, GetUserSetting, LogoutUser } from '@/services/User'

// Determinem el locale
let locale = 'en-US';

let supportedLocales = ['en-US', 'es-ES', 'ca'];
let navLocale = window.navigator.language;

if(supportedLocales.includes(navLocale)) locale = navLocale;

try {
    if(GetUser()) locale = await GetUserSetting('lang');
} catch(ex) {
    LogoutUser();
}

const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en-US',
    messages: {
        'en-US': (await import(`../locales/en-US.json`)).default,
        'es-ES': (await import(`../locales/es-ES.json`)).default,
        'ca': (await import(`../locales/ca.json`)).default,
    }
});

export default i18n;