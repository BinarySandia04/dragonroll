<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';
import IconButton from '@/views/partials/game/IconButton.vue'

import Dice from 'dice-notation-js'
import { GetClient, SendMessage } from '../../../services/Dragonroll';

const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);

const diceResult = ref("");
const diceField = ref(null);

let id = data.id;

let ThrowD4 = () => { ThrowDice("d4") };
let ThrowD6 = () => { ThrowDice("d6") };
let ThrowD8 = () => { ThrowDice("d8") };
let ThrowD10 = () => { ThrowDice("d10") };
let ThrowD12 = () => { ThrowDice("d12") };
let ThrowD20 = () => { ThrowDice("d20") };

function comp (s, m, n, f, a) {
    m = parseInt( m );
    if( isNaN( m ) ) m = 1;
    n = parseInt( n );
    if( isNaN( n ) ) n = 1;
    f = parseInt( f );
    a = typeof(a) == 'string' ? parseInt( a.replace(/\s/g, '') ) : 0;
    if( isNaN( a ) ) a = 0;
    var r = 0;
    for( var i=0; i<n; i++ )
        r += Math.floor( Math.random() * f ) + 1;
    return r * m + a;
};

function parse( de ) {
    return comp.apply( this, de.match(/(?:(\d+)\s*\*\s*)?(\d*)d(\d+)(?:\s*([\+\-]\s*\d+))?/i) );
}

function ThrowDice(expr){
    // let result = Dice.detailed(expr);
    diceField.value.value = expr;
    let result = parse(expr);

    let audios = ['/sounds/roll1.wav', '/sounds/roll2.wav']
    const audio = new Audio(audios[Math.floor(Math.random() * audios.length)]);
    audio.type = "audio/wav"
    audio.play();

    console.log(result)
    diceResult.value = result;

    SendMessage({
        content: {
            roll: result,
            throw: expr  
        },
        author: GetClient()._id,
        type: 'dice-roll'
    })
}

function ThrowCustomDice(){
    ThrowDice(diceField.value.value);
}

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 300, height: 210});
    ResetPosition(id, {x: 100, y: 150});
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <div class="horizontal-dice">
            <IconButton icon="icons/game-icons/000000/skoll/d4.svg" :action="ThrowD4" tooltip="Throw d4" size="big"></IconButton>
            <IconButton icon="icons/game-icons/000000/delapouite/perspective-dice-six-svg.svg" :action="ThrowD6" tooltip="Throw d6" size="big"></IconButton>
            <IconButton icon="icons/game-icons/000000/delapouite/dice-eight-faces-eight.svg" :action="ThrowD8" tooltip="Throw d8" size="big"></IconButton>
            <IconButton icon="icons/game-icons/000000/skoll/d10.svg" :action="ThrowD10" tooltip="Throw d10" size="big"></IconButton>
            <IconButton icon="icons/game-icons/000000/skoll/d12.svg" :action="ThrowD12" tooltip="Throw d12" size="big"></IconButton>
            <IconButton icon="icons/game-icons/000000/delapouite/dice-twenty-faces-twenty.svg" :action="ThrowD20" tooltip="Throw d20" size="big"></IconButton>
        </div>

        <div class="custom-dice">
            <input type="text" ref="diceField">
            <IconButton icon="icons/game-icons/000000/delapouite/rolling-dices.svg" size="big" :action="ThrowCustomDice" tooltip="Throw"></IconButton>
        </div>

        <div class="roll-result">{{ diceResult }}</div>
    </div>
</template>


<style scoped>
.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}

.horizontal-dice {
    display: flex;
    flex-direction: row;
    z-index: 1;

    user-select: none;
}

.custom-dice {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

input[type=text] {
    height: 32px;
    padding: 6px;
    border-radius: 6px;
    margin-right: 6px;

    text-align: center;
}

.roll-result {
    font-size: 48px;
    font-weight: bold;
    font-family: MrEavesRemake;
}
</style>
