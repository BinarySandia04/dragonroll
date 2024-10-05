<script setup>
import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition, ClearWindow } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';
import ErrorMessage from '@/components/partials/ErrorMessage.vue'

import Server from '@/services/Server.js'
import SystemSelector from '@/views/partials/SystemSelector.vue';
import { GetEmitter } from '@/services/Dragonroll';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

const campaignName = ref("");
const systemSelector = ref(null);

const errorMessage = ref("");

let id = data.id;
let system = "";

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 350, height: 240});
    ResetPosition(id, "center");
    GetEmitter().on('select', (system_id) => Select(system_id))

    console.log(system);
});

function Select(system_id){
    system = system_id;
    try {
        systemSelector.value.selectedSystem = system_id;
    } catch {}
}


function NewCampaign(){
    Server().post('/campaign/create', {
        name: campaignName.value,
        system
    }).then((response) => {
        if(response.data.status == "error"){
            errorMessage.value = response.data.msg;
        } else {
            ClearWindow(id);
            GetEmitter().emit('refresh_campaign');
        }
    });
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body -->
        <form v-on:submit.prevent="NewCampaign">
            <div class="form-field">
                <input id="username-field" type="text" :placeholder="$t('campaigns.create.enter')" name="campaignName" v-model="campaignName" autocomplete="off" >
            </div>
            <div class="form-field">
                <SystemSelector :windowId="id" ref="systemSelector"></SystemSelector>
            </div>
            <div class="form-field">
                <button class="btn-primary sound-click">{{ $t("general.create")}}</button>
            </div>
        </form>
    
        <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>
    </div>
</template>


<style scoped lang="scss">
.window-wrapper {
    display: flex;
    align-items: center;
}

.window-second-header {
    width: 100%;
    h2 {
        font-family: MrEavesRemake;
    }
}

form {
    width: 100%;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
}

.form-field {
    padding: 2px;
    display: flex;
    align-items: left;
    flex-direction: column;
    justify-content: left;
    width: 100%;
}

label {
    text-align: left;
}

</style>