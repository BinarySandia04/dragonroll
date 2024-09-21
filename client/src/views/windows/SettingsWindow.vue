<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import { GetUser } from '@/services/User'

import WindowHandle from '@/views/partials/WindowHandle.vue';
import Tabs from '../partials/Tabs.vue';
import { I18nD, I18nN } from 'vue-i18n';
import Dropdown from '../partials/Dropdown.vue';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;

let rows = ref(["Account settings"]);

const langSelector = ref(null);

onBeforeMount(() => {
    if(GetUser().admin) rows.value.push("Site Administration");
});

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 380});
    ResetPosition(id, "center");
});

function OnLanguageChange(){
    I18n.locale = langSelector.value.value;
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body -->
        <Tabs :rows="rows">
            <template #account-settings>
                Language: <Dropdown :options="languageOptions" :select="OnLanguageChange"></Dropdown>
            </template>
            <template #site-administration>

            </template>
        </Tabs>
    </div>
</template>


<style scoped>
.window-wrapper {
    min-width: 700px;
    min-height: 630px;

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
