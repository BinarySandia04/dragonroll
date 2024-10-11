import { ref } from "vue";
import { GetCampaignModule } from "./Campaign";

const inGameRef = ref(false);
let InGameRef = () => inGameRef;

function LaunchGame(){
    inGameRef.value = true;
    GetCampaignModule().init();
}

function ExitGame(){
    inGameRef.value = false;
    GetCampaignModule().exit();
}

export {
    LaunchGame,
    ExitGame,

    InGameRef
};