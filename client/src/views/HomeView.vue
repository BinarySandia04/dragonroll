<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

import WindowManager from '@/views/managers/WindowManager.vue'
import { GetUser } from '@/services/User'

import { CreateWindow } from '@/services/Windows'

onMounted(() => {
  if(GetUser()){
    CreateWindow({type: "main_menu", id: "main_menu"})
    return;
  }
  CreateWindow({type: "login", id: "login"});
}
);


</script>

<template>
  <WindowManager></WindowManager>
</template>


<style scoped>


</style>
