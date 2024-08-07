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
import CampaignListWindow from '../windows/campaigns/CampaignListWindow.vue'
import NewCampaignWindow from '../windows/campaigns/NewCampaignWindow.vue'
import JoinCampaignWindow from '../windows/campaigns/JoinCampaignWindow.vue'
import CampaignPreviewWindow from '@/views/windows/campaigns/CampaignPreviewWindow.vue'
import ChatWindow from '../windows/game/ChatWindow.vue'
import DiceWindow from '../windows/game/DiceWindow.vue'
import MapButtons from '../windows/dm/MapButtons.vue'
import EnvironmentWindow from '../windows/dm/EnvironmentWindow.vue'

// Gestionem ventanas
const reload = ReloadRef();
const windows = Windows();

const WindowMap = {
  login: LoginWindow,
  main_menu: MainMenuWindow,
  register: RegisterWindow,
  edit_profile: EditProfileWindow,
  account_settings: AccountSettingsWindow,
  campaign_list: CampaignListWindow,
  new_campaign: NewCampaignWindow,
  join_campaign: JoinCampaignWindow,
  campaign_preview: CampaignPreviewWindow,
  chat: ChatWindow,
  dice_menu: DiceWindow,
  map_buttons: MapButtons,
  environment: EnvironmentWindow
};
</script>

<template>
  <div class="window-container" :key="reload">
    <component v-for="win in windows" :is="WindowMap[win.type]" :key="win.id" :data="win"></component>
  </div>
</template>


<style>

.window-wrapper {
    background-color: var(--window-background);

    /* backdrop-filter: blur(10px); */
    position: fixed;


    display: flex;
    flex-direction: column;
    text-align: center;
}

</style>
