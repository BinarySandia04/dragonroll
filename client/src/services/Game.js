import { ref } from "vue";

const inGameRef = ref(false);
let InGameRef = () => inGameRef;

function LaunchGame(){
    inGameRef.value = true;
    console.log("jdksadjlo")
}

function ExitGame(){
    inGameRef.value = false;
}

export {
    LaunchGame,
    ExitGame,

    InGameRef
};