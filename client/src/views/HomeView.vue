<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

import WindowManager from '@/views/managers/WindowManager.vue'
import { GetUser } from '@/services/User'

// Gestionem ventanas
import useEmitter from '@/services/Emitter';
const emitter = useEmitter();


onMounted(() => {
  if(GetUser()){
    emitter.emit("create-window", {type: "main_menu", id: "main_menu"})
    return;
  }
  emitter.emit("create-window", {type: "login", id: "login"});
}
);


</script>

<template>
  <WindowManager></WindowManager>
</template>


<style scoped>


</style>
