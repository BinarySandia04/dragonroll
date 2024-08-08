<script setup>
import { inject, onMounted, ref } from 'vue';
import { GetEmitter } from '../../services/Dragonroll';

const props = defineProps(['data']);
const data = props.data;

const title = ref("");
const image = ref(null);

const clearParent = inject('clearParent');

function Select(){
    if(data.id){
        GetEmitter().emit("select", data.id);
        clearParent();
    }
}

onMounted(() => {
    title.value = data.title;
    image.value.src = "modules/" + data.id + "/icon.png"
})

</script>


<template>
    <div class="system-container" v-on:click="Select">
        <img class="system-icon" ref="image">
        <div class="system-content">
            <span class="title">{{ title }}</span>
        </div>
    </div>
</template>


<style scoped lang="scss">
.system-content {
    margin-left: 10px;
    width: 100%;
    text-align: left;
    align-items: center;
    display: flex;
}


.title {
    font-weight: bold;
}

.system-container {
    display: flex;
    padding: 10px;
    user-select: none;

    transition: background-color .2s;

    &:hover {
        background-color: var(--color-background-softer);
    }
}

.system-icon {
    width: 32px;
    margin-right: auto;
}
</style>