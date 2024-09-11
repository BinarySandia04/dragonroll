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
        <div class="roll-result">
            <span>{{ roll }}</span>
            <img class="roll-bg" src="/img/d20.png">
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">
.dice-roll-container {
    display: flex;
    flex-direction: row;

    width: 300px;
    height: 50px;
    align-items: center;

    .roll-result {
        margin-left: auto;
        height: 100%;
        position: relative;

        span {
            top: 5px;
            left: -41px;
            position: absolute;
            font-size: 40px;
            height: 40px;
            line-height: 40px;
            font-weight: bold;
            font-family: MrEavesRemake;
            text-align: center;
            width: 60px;

        }
        img {
            top: 5px;
            left: -31px;
            position: absolute;

            filter: invert(0.9);
            opacity: 0.1;
            width: 40px;
        }
    }
}

.roll-title {
    font-weight: bold;
}
</style>