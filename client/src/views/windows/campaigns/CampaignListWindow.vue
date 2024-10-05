<script setup>
import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';
import { CreateChildWindow } from '@/services/Windows';

import Server from '@/services/Server.js'
import CampaignEntry from '@/views/partials/CampaignEntry.vue';
import { GetEmitter } from '@/services/Dragonroll';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

const myCampaigns = ref([]);
const otherCampaigns = ref([]);

let id = data.id;
onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 680});
    ResetPosition(id, "center");

    RefreshCampaigns();

    GetEmitter().on('refresh_campaign', () => { RefreshCampaigns() });
});

function CreateCampaign(){
    CreateChildWindow(id, 'new_campaign');
}

function JoinCampaign(){
    CreateChildWindow(id, 'join_campaign')
}

function RefreshCampaigns(){
    Server().get('/campaign/list').then((response) => {
        response.data.forEach((camp) => {
            if(camp.is_dm) {
                myCampaigns.value.push(camp.campaign);
            } else {
                otherCampaigns.value.push(camp.campaign);
            }
        });
    });
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <div class="window-body">
            <!-- Body -->
            <div class="campaign-list-container">
                <div class="window-second-header">
                    <h2 class="centered">{{ $t("campaigns.your-campaigns")}}</h2>

                    <div class="campaign-list">
                        <CampaignEntry v-for="camp in myCampaigns" :key="camp._id" :data="camp"></CampaignEntry>
                    </div>
                </div>

                <div class="window-second-header">
                    <h2 class="centered">{{ $t("campaigns.other-campaigns")}}</h2>
                    <div class="campaign-list">
                        <CampaignEntry v-for="camp in otherCampaigns" :key="camp._id" :data="camp"></CampaignEntry>
                    </div>

                </div>
            </div>

            <div class="buttons-row">
                <button class="btn-primary button-row sound-click" v-on:click.prevent="CreateCampaign">{{ $t("campaigns.create.title")}}</button>
                <button class="btn-primary button-row sound-click" v-on:click.prevent="JoinCampaign">{{ $t("campaigns.join.title")}}</button>
            </div>
        </div>

    </div>
</template>


<style scoped lang="scss">

.campaign-list {

}

.campaign-list-container {
    height: 100%;
    overflow: auto;
}

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

.buttons-row {
    margin-top: auto;
    margin-bottom: 10px;
}

.form-field {
    padding: 10px;
    display: flex;
    align-items: left;
    flex-direction: column;
    justify-content: left;
    width: 600px;
}

.window-body {
    max-height: 660px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

label {
    text-align: left;
}

</style>