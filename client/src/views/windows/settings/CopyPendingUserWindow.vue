<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 

import { onMounted, ref, shallowRef, toRaw } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';
import { DisplayToast } from '../../../services/Dragonroll';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 300, height: 170});
    ResetPosition(id, "center");
});

function CopyLink(){
    let root = location.protocol + '//' + location.host;
    navigator.clipboard.writeText(`${root}/setup/${data.code}`)
    DisplayToast('aqua', t('settings.pending-account.copy-success'));
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        <div class="document centered">
            <h1>{{$t('settings.pending-account.title')}}</h1>
            <p>{{$t('settings.pending-account.content')}}</p>
        </div>
        <button v-on:click.prevent="CopyLink">{{$t('settings.pending-account.copy-link')}}</button>
    </div>
</template>


<style scoped>
.window-wrapper {
    display: flex;
    align-items: center;
}
</style>


