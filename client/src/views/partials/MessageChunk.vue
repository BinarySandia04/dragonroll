<script setup>
import { onMounted, ref } from 'vue';

const text = ref("");
const roll = ref("");

const props = defineProps(['data']);
const data = props.data;

onMounted(() => {
    if(data.type == "dice-roll"){
        text.value = data.content.throw;
        roll.value = data.content.roll;
    } else {
        text.value = data.content.text;
    }
});

</script>

<template>
<div class="msg-chunk">
    <span v-if="data.type == 'text'">{{ text }}</span>
    <div v-if="data.type == 'dice-roll'" class="dice-roll-container">
        <span class="roll-title">Rolled {{ text }}</span>
        <span class="roll-result">{{ roll }}</span>
        <img class="roll-bg" src="/img/d20.png">
    </div>
</div>
</template>

<style scoped lang="scss">
.dice-roll-container {
    display: flex;
    flex-direction: column;

    width: 300px;
    padding-bottom: 10px;
}

.roll-title {
    font-weight: bold;
}

.roll-result {
    font-size: 48px;
    font-weight: bold;
    font-family: MrEavesRemake;
    text-align: center;
    margin-bottom: -75px;
}

.roll-bg {
    filter: invert(0.9);
    opacity: 0.1;
    width: 75px;
    position: relative;
    left: 112px;
    top: 0px;
}
</style>