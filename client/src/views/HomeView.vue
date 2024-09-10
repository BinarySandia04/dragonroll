<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

import WindowManager from '@/views/managers/WindowManager.vue'
import { GetUser } from '@/services/User'

import { CreateWindow } from '@/services/Windows'
import Toast from './partials/Toast.vue';
import { DisplayToast, SetEmitter } from '../services/Dragonroll';
import GameManager from './managers/GameManager.vue';
import TooltipManager from './managers/TooltipManager.vue';
import ContextMenuManager from './managers/ContextMenuManager.vue';


</script>

<template>
  <Toast></Toast>
  <GameManager></GameManager>
  <TooltipManager></TooltipManager>
  <ContextMenuManager></ContextMenuManager>
  <WindowManager></WindowManager>
</template>


<style scoped>


</style>
