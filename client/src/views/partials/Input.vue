<script setup>
import { ref } from 'vue';

const input = ref(null)

function Set(value){
    input.value.value = value;
}

function OnUpdate(callback){
    input.value.addEventListener("change", (e) => {callback(input.value.value) });
}

defineExpose({
    Set,
    OnUpdate
})
</script>

<template>
<input type="text" class="number-input" ref="input">
</template>

<style lang="scss" scoped>
.number-input {
    flex-grow: 1;
    flex-shrink: 1;
    text-align: center;
    width: 100px;
}
</style>