<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import { GetUser } from '@/services/User'

import WindowHandle from '@/views/partials/WindowHandle.vue';
import Tabs from '@/views/partials/Tabs.vue';
import Dropdown from '@/views/partials/Dropdown.vue';
import { GetUserSetting, SetUserSetting } from '@/services/User';
import { ClearWindow, CreateWindow, SetMinSize, SetResizable } from '@/services/Windows';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;

let rows = ref([{id: "account-settings", value: "settings.tabs.account-settings"}]);

const languageOptions = ref(["English", "Spanish", "Catalan"])
const langSelector = ref(null);
const currentLanguage = ref("");

onBeforeMount(() => {
    let codes = {
        "en-US": "English",
        "es-ES": "Spanish",
        "ca": "Catalan"
    }
    GetUserSetting('lang').then(value => {
        currentLanguage.value = codes[value ?? 'en']
        console.log(currentLanguage.value)
    });
    if(GetUser().admin) rows.value.push({
        id: "site-administration",
        value: "settings.tabs.site-administration"
    });
});

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 400, height: 480});
    ResetPosition(id, "center");

    SetResizable(id, true);
    SetMinSize(id, {width: 350, height: 280});
});

function OpenManageAccounts(){
    ClearWindow('settings');
    CreateWindow('account_management', {
        type: 'account_management',
        title: 'settings.site-administration.manage-accounts.title',
        id: 'account-management',
        back: () => {
            ClearWindow('account-management')
            CreateWindow('settings', {
                id: 'settings',
                type: 'settings',
                title: 'settings.title',
                back: () => { ClearWindow('settings'); CreateWindow('main_menu');  }
            });
        }
    })
}

function OpenManagePlugins(){
    ClearWindow('settings');
    CreateWindow('plugin_management', {
        type: 'plugin_management',
        title: 'settings.site-administration.manage-plugins.title',
        id: 'plugin-management',
        back: () => {
            ClearWindow('plugin-management')
            CreateWindow('settings', {
                id: 'settings',
                type: 'settings',
                title: 'settings.title',
                back: () => { ClearWindow('settings'); CreateWindow('main_menu');  }
            });
        }
    })
}

async function OnLanguageChange(value){
    let codes = {
        "English": "en-US",
        "Spanish": "es-ES",
        "Catalan": "ca"
    }
    await SetUserSetting("lang", codes[value]);
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body -->
        <Tabs :rows="rows">
            <template #account-settings>
                <div class="form-container">
                    <div class="form-element">
                        <label>{{ $t('settings.account.language') }}</label>
                        <Dropdown :options="languageOptions" :onselect="OnLanguageChange" :selected="currentLanguage"></Dropdown>
                    </div>
                </div>
            </template>
            <template #site-administration>
                <div class="form-element centered">
                    <button v-on:click.prevent="OpenManageAccounts">{{ $t('settings.site-administration.manage-accounts-button') }}</button>
                </div>
                <div class="form-element centered">
                    <button v-on:click.prevent="OpenManagePlugins">{{ $t('settings.site-administration.manage-plugins-button') }}</button>
                </div>
            </template>
        </Tabs>
    </div>
</template>


<style scoped>
.window-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
}

.splash-image {
    width: 600px;
    height: 250px;
}

.form-field {
    padding: 10px;
    display: flex;
    align-items: left;
    flex-direction: column;
    justify-content: left;
    width: 600px;
}

label {
    text-align: left;
}

</style>
