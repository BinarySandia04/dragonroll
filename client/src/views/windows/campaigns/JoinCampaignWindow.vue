<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';
import { DisplayToast } from '../../../services/Dragonroll';
import { ClearWindow } from '../../../services/Windows';
import Api from '@/services/Api'

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

const code = ref("");

let id = data.id;
onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {x: 300, y: 150});
    ResetPosition(id, "center");
});

function JoinCampaign(){
    let invite_code = code.value;
    Api().post('/campaign/join', {
        invite_code
    }).then(response => {
        if(response.data.status == "ok"){
            DisplayToast('green', "Successfully joined the campaign!", 2000);
            let campaign = response.data.campaign;

            ConnectToCampaign(campaign);
            DisplayCampaign(campaign);
        } else if(response.data.msg == "already"){
            DisplayToast('red', "You are already in that campaign!", 2000);
        } else {
            DisplayToast('red', "Error joining this campaign (maybe the code is not valid?)", 2000);
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
                <input id="username-field" type="text" placeholder="Enter campaign code..." name="code" v-model="code" autocomplete="off" >
            </div>
            <div class="form-field">
                <button class="btn-primary sound-click" v-on:click.prevent="JoinCampaign">Join</button>
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