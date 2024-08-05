<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

import useEmitter from '@/services/Emitter';
const emitter = useEmitter();

import WindowManager from '@/views/managers/WindowManager.vue'
import { GetUser } from '@/services/User'

import { CreateWindow } from '@/services/Windows'
import Toast from './partials/Toast.vue';
import { DisplayToast, SetEmitter } from '../services/Dragonroll';
import GameManager from './managers/GameManager.vue';

onMounted(() => {
  SetEmitter(emitter);
  if(GetUser()){
    CreateWindow('main_menu')
    DisplayToast('green', 'Logged in successfully as ' + GetUser().username + '!', 3000)
    return;
  }
  CreateWindow('login');
}
);


</script>

<template>
  <Toast></Toast>
  <GameManager></GameManager>
  <WindowManager></WindowManager>
</template>


<style scoped>


</style>
