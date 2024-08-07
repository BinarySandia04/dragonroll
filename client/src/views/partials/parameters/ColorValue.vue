<script setup>
import { onMounted, ref } from 'vue';

const color = ref("");
const colorValue = ref(null);
const colorPicker = ref(null);

onMounted(() => {
    colorValue.value.addEventListener('click', () => {
        console.log("Click");
        colorPicker.value.click();
    })

    colorPicker.value.addEventListener('input', (event) => {
        let newColor = event.target.value;
        colorValue.value.classList.remove('unselected');
        colorValue.value.style.backgroundColor = newColor;
        color.value = newColor;
    });
});

let GetColor = () => color;

defineExpose({ GetColor });
</script>

<template>
    <input type="color" id="colorPicker" ref="colorPicker">
<div class="color-value unselected" ref="colorValue"></div>
</template>

<style lang="scss">
#colorPicker {
    display: none;
}

.color-value {
    width: 30px;
    height: 20px;

    &.unselected {
        background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
        background-size: 10px 10px;
        background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
    }
    
}
</style>