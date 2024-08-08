<script setup>

import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import { GetUser, UserStatus, LoadUser } from '@/services/User.js'
import { IsAdmin } from './services/User'

import useEmitter from '@/services/Emitter';
const emitter = useEmitter();

import { DisplayToast, SetEmitter } from './services/Dragonroll'
import { ImportModule, GetModulesToLoad } from './services/Modules'
import { CreateWindow } from './services/Windows';

console.clear();
console.log("%cLoaded!!!", "color: #22ff22; font-size: 24px");
LoadUser();

SetEmitter(emitter);
onMounted(() => {
  async function preloadModules(){
    const modules = GetModulesToLoad();
    let moduleLoads = [];

    modules.forEach(moduleName => {
        moduleLoads.push(ImportModule(moduleName));
    });

    await Promise.all(moduleLoads);
    DisplayToast('aqua', 'All modules loaded successfully');

    if(GetUser()){
      CreateWindow('main_menu')
      // CreateWindow('test');
      DisplayToast('green', 'Logged in successfully as ' + GetUser().username + '!', 3000)
      return;
    }
    CreateWindow('login');
  }

  preloadModules();
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
