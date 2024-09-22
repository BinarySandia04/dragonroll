<script setup>

import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import { GetUser, HasAdmin, UserStatus, LoadUser } from '@/services/User.js'
import { IsAdmin } from './services/User'

import useEmitter from '@/services/Emitter';
const emitter = useEmitter();

import { DisplayToast, SetEmitter } from './services/Dragonroll'
import { ImportModule, GetModulesToLoad } from './services/Modules'
import { CreateWindow } from './services/Windows';
import { FetchVanillaResources } from './services/Resources';

LoadUser();

SetEmitter(emitter);

async function start(){
  if(GetUser()){
    CreateWindow('main_menu');
    // DisplayToast('green', 'Logged in successfully as ' + GetUser().username + '!', 3000)
  } else {
    if(await HasAdmin()){
      CreateWindow('login');
    } else {
      CreateWindow('register');
    }
  }

  const modules = GetModulesToLoad();
  let moduleLoads = [];

  modules.forEach(moduleName => {
      moduleLoads.push(ImportModule(moduleName));
  });

  await Promise.all(moduleLoads);

  await FetchVanillaResources();

  DisplayToast('aqua', 'All modules loaded successfully');


}

onMounted(() => {
  start();
})


</script>

<template>
  <div class="wrapper" id="container">
    <RouterView />
  </div>

</template>

<style scoped>

.web-title {
  font-size: 22px;
  font-weight: bolder;
  padding-bottom: 12px;
  color: var(--color-heading)
}

.sidebar-link {
  font-weight: bold;
}

.sidebar-separator {
  margin-top: 10px;
  margin-left: 8px;
  margin-bottom: 10px;
}

.top-nav {
  display: flex;
  width: 100%;
  flex-direction: column;
}

a {
  width: 100%;
}

.sidebar {
  flex-grow: 0;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  display: flex;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: auto;

  background-color: var(--color-background-soft);
}

.wrapper {
  flex-grow: 1;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .sidebar {
    min-width: 240px;
    padding: 16px;
    height: 100%;
  }
}
</style>
