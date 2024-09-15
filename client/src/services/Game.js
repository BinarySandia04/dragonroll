import { ref } from "vue";
import { FetchData, InitData } from "./Data";

const inGameRef = ref(false);
let InGameRef = () => inGameRef;

function LaunchGame(){
    inGameRef.value = true;
    InitData();
    FetchData();
}

function ExitGame(){
    inGameRef.value = false;
}

export {
    LaunchGame,
    ExitGame,

    InGameRef
};