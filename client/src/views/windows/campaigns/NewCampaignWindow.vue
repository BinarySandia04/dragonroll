<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';

import Api from '@/services/Api.js'

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

const campaignName = ref("");

let id = data.id;
onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {x: 300, y: 150});
    ResetPosition(id, "center");
});


function NewCampaign(){
    Api().post('/campaign/create', {
        name: campaignName.value
    }).then((response) => {
        console.log(response);
    });
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body -->
        <form v-on:submit.prevent="NewCampaign">
            <div class="form-field">
                <input id="username-field" type="text" placeholder="Enter campaign name..." name="campaignName" v-model="campaignName" autocomplete="off" >
            </div>
            <div class="form-field">
                <button class="btn-primary sound-click">Create</button>
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