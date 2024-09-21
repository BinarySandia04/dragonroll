<script setup>

import { onMounted, ref } from 'vue';

import Api from '@/services/Api'
import { AddSound } from '../../services/Sound';
import { ConnectToCampaign, DisplayCampaign } from '../../services/Campaign';

const props = defineProps(['data']);
const data = props.data;

const title = ref("");
const last_session = ref("");

const container = ref(null);

onMounted(() => {
    title.value = data.name;
    last_session.value = new Date(data.last_opened).toISOString().slice(0, 10);
    
    AddSound(container.value)
});

function ViewCampaign(){
    ConnectToCampaign(data);
    DisplayCampaign(data);
}
</script>


<template>
    <div class="campaign-entry-container" ref="container">
        <div class="main-campaign-entry-container-inner">
            <img class="campaign-icon" src="/img/def-avatar.jpg" draggable="false">
            <div class="campaign-info">
                <b>{{ title }}</b><br>Last session: <span>{{ last_session }}</span>
            </div>

            <div class="campaign-user-actions">
                <button class="btn-primary button-small sound-click" v-on:click.prevent="ViewCampaign">View</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.button-small {
    height: 32px;
    padding: 10px;
}

.campaign-entry-container {
    background-color: var(--color-background-softer);
    width: 100%;
    user-select: none;

    border-bottom: 1px solid var(--color-border);
    &:first-child {
        border-top: 1px solid var(--color-border);
    }
}

.main-campaign-entry-container-inner {
    padding: 10px;
    display: flex;
    align-items: center;

    justify-content: center;
}

.campaign-info {
    text-align: left;
    margin-left: 10px;
}

.campaign-icon {
    width: 40px;
    height: 40px;
}

.campaign-user-actions {
    margin-left: auto;
}
</style>
