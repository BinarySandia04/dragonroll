<script setup>
import { ref, reactive } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import LoginWindow from '@/views/windows/LoginWindow.vue'
import RegisterWindow from '@/views/windows/RegisterWindow.vue'
import ExampleWindow from '@/views/windows/ExampleWindow.vue'
import MainMenuWindow from '@/views/windows/MainMenuWindow.vue'

// Gestionem ventanas
import useEmitter from '@/services/Emitter';
const emitter = useEmitter();

const reload = ref(0);

const windows = {
    login: reactive([]),
    register: reactive([]),
    test: reactive([]),
    main_menu: reactive([]),
};

emitter.on("create-window", (data) => {
    if(windows[data.type] === undefined){
        console.log("Window type " + data.type + " is not defined!");
        return;
    }

    windows[data.type].push(data);
    reload.value += 1;
})


emitter.on("clear-windows", (data) => {
    windows[data.type] = [];
    reload.value += 1;
})

</script>

<template>
  <div class="window-container" :key="reload">
    <LoginWindow v-for="window in windows.login" :key="window.id" :data="window"></LoginWindow>
    <RegisterWindow v-for="window in windows.register" :key="window.id" :data="window"></RegisterWindow>
    <ExampleWindow v-for="window in windows.test" :key="window.id" :data="window"></ExampleWindow>
    <MainMenuWindow v-for="window in windows.main_menu" :key="window.id" :data="window"></MainMenuWindow>
  </div>
</template>


<style>

.window-wrapper {
    background-color: var(--color-background-soft);

    position: fixed;


    display: flex;
    flex-direction: column;
    text-align: center;
}

.window-handle {
    user-select: none;
    font-family: MrEavesRemake;
    justify-content: center;
    width: 100%;

    background-color: var(--color-handler);
}

</style>
