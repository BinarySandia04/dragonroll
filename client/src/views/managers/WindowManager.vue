<script setup>
import { ref, reactive } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import LoginWindow from '@/views/windows/LoginWindow.vue'
import RegisterWindow from '@/views/windows/RegisterWindow.vue'
import ExampleWindow from '@/views/windows/ExampleWindow.vue'
import MainMenuWindow from '@/views/windows/MainMenuWindow.vue'
import EditProfileWindow from '@/views/windows/EditProfileWindow.vue'
import AccountSettingsWindow from '../windows/AccountSettingsWindow.vue'

import { Windows, ReloadRef } from '@/services/Windows';
import DbWindow from '../windows/database/DbWindow.vue'

// Gestionem ventanas
const reload = ReloadRef();
const windows = Windows();

// Win names
const login = windows.login;
const register = windows.register;
const test = windows.test;
const main_menu = windows.main_menu;
const edit_profile = windows.edit_profile;
const account_settings = windows.account_settings;
const db_window = windows.db_window;

</script>

<template>
  <div class="window-container" :key="reload">
    <LoginWindow v-for="win in login" :key="win.id" :data="win"></LoginWindow>
    <RegisterWindow v-for="win in register" :key="win.id" :data="win"></RegisterWindow>
    <ExampleWindow v-for="win in test" :key="win.id" :data="win"></ExampleWindow>
    <MainMenuWindow v-for="win in main_menu" :key="win.id" :data="win"></MainMenuWindow>
    <EditProfileWindow v-for="win in edit_profile" :key="win.id" :data="win"></EditProfileWindow>
    <AccountSettingsWindow v-for="win in account_settings" :key="win.id" :data="win"></AccountSettingsWindow>
    <DbWindow v-for="win in db_window" :key="win.id" :data="win"></DbWindow>
  </div>
</template>


<style>

.window-wrapper {
    background-color: var(--window-background);

    backdrop-filter: blur(10px);
    position: fixed;


    display: flex;
    flex-direction: column;
    text-align: center;
}

</style>
