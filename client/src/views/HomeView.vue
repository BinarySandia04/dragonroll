<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 

import { onMounted } from 'vue';
import WindowManager from '@/views/managers/WindowManager.vue'

import Server from '@/services/Server'
import { CreateWindow } from '@/services/Windows'
import { GetUser, HasAdmin, LoadUser } from '@/services/User.js'
import { DisplayToast, SetEmitter } from '@/services/Dragonroll';
import { FetchResources } from '@/services/Resources';
import { FetchPlugins } from '@/services/Plugins';
import useEmitter from '@/services/Emitter';
const emitter = useEmitter();

import Toast from '@/views/partials/Toast.vue';
import GameManager from '@/views/managers/GameManager.vue';
import TooltipManager from '@/views/managers/TooltipManager.vue';
import ContextMenuManager from '@/views/managers/ContextMenuManager.vue';

import { useRoute } from 'vue-router'
import Background from './managers/Background.vue';

LoadUser();

SetEmitter(emitter);


async function DisplayFirstWindow(){
  if(GetUser()){

    Server().get('/plugins/module/dnd-5e/dnd-5e/testing').then(res => {})
    CreateWindow('main_menu');
    return;
  }
  
  // Check if we have a link
  if(route.query.setupCode){
    // Let's try to activate it
    Server().get('/user/verify-setup?code=' + route.query.setupCode).then(res => {
      if(res.data.code){
        // Yep exists
        CreateWindow('setup_account', {
          title: "register-account.setup.title",
          id: 'setup_account',
          setupCode: res.data.code,
        })
        return;
      }
      DisplayToast("red", t('register-account.setup.invalid-link'));
      CreateWindow('login');

    });
  } else {
    if(await HasAdmin()){
      CreateWindow('login');
    } else {
      CreateWindow('register');
    }
  }

}

async function start(){

  DisplayFirstWindow();

  await FetchResources();
  await FetchPlugins();

  DisplayToast('aqua', 'All plugins loaded successfully');
}

onMounted(() => {
  start();
})

const route = useRoute()
</script>

<template>
  <Toast></Toast>
  <GameManager></GameManager>
  <TooltipManager></TooltipManager>
  <ContextMenuManager></ContextMenuManager>
  <WindowManager></WindowManager>
  <Background></Background>
</template>


<style scoped>


</style>
