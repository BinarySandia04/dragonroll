<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps(['data', 'click']);
const data = props.data;

const title = ref("");
const image = ref(null);

function Select(){
    if(props.click) props.click(data.id);
}

onMounted(() => {
    console.log(data);
    title.value = data.title;
    image.value.src = `plugins/${data.id}/${data.icon}`;
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