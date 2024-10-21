import { ref } from "vue";
import { GetCampaignModule } from "./Campaign";
import { GetCampaign } from "./Dragonroll";

const inGameRef = ref(false);
let InGameRef = () => inGameRef;

function LaunchGame(){
    inGameRef.value = true;
    GetCampaignModule().init(GetCampaign());
}

function ExitGame(){
    inGameRef.value = false;
    if(GetCampaignModule().exit) GetCampaignModule().exit();
}

export {
    LaunchGame,
    ExitGame,

    InGameRef
};