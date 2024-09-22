<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import { GetUser } from '@/services/User'

import WindowHandle from '@/views/partials/WindowHandle.vue';
import Tabs from '../partials/Tabs.vue';
import Dropdown from '../partials/Dropdown.vue';
import { GetUserSetting, SetUserSetting } from '../../services/User';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;

let rows = ref(["Account settings"]);

const languageOptions = ref(["English", "Spanish", "Catalan"])
const langSelector = ref(null);
const currentLanguage = ref("");

onBeforeMount(() => {
    let codes = {
        "en": "English",
        "es": "Spanish",
        "ca": "Catalan"
    }
    GetUserSetting('lang').then(value => {
        currentLanguage.value = codes[value ?? 'en']
        console.log(currentLanguage.value)
    });
    if(GetUser().admin) rows.value.push("Site Administration");
});

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 400, height: 480});
    ResetPosition(id, "center");
});

async function OnLanguageChange(value){
    let codes = {
        "English": "en",
        "Spanish": "es",
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
            </template>Hola
            <template #site-administration>

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
