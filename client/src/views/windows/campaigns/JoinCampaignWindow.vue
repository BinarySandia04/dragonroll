<script setup>
import { useI18n } from 'vue-i18n';
const {t} = useI18n();


import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';
import { DisplayToast } from '@/services/Dragonroll';
import Server from '@/services/Server'

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

const code = ref("");

let id = data.id;
onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 300, height: 150});
    ResetPosition(id, "center");
});

function JoinCampaign(){
    let invite_code = code.value;
    Server().post('/campaign/join', {
        invite_code
    }).then(response => {
        if(response.data.status == "ok"){
            DisplayToast('green', t("campaigns.join.success"), 2000);
            let campaign = response.data.campaign;

            ConnectToCampaign(campaign);
            DisplayCampaign(campaign);
        } else if(response.data.msg == "already"){
            DisplayToast('red', t("campaigns.join.already"), 2000);
        } else {
            DisplayToast('red', t("campaigns.join.error"), 2000);
        }
    }).catch((err) => console.log(err)); 
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body -->
        <form v-on:submit.prevent="JoinCampaign">
            <div class="form-field">
                <input id="username-field" type="text" :placeholder='$t("campaigns.join.enter")' name="code" v-model="code" autocomplete="off" >
            </div>
            <div class="form-field">
                <button class="btn-primary sound-click" v-on:click.prevent="JoinCampaign">{{ $t("general.join")}}</button>
            </div>
        </form>
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