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
    max-width: 70px;
    text-align: center;
}
</style>