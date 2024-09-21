function AddSound(element){
    let soundClicks = element.getElementsByClassName("sound-click");
    
    for (let i = 0; i < soundClicks.length; i++) {
       soundClicks[i].addEventListener("click", async (event) => {
            const audio = new Audio('/sounds/snap.wav');
            audio.type = "audio/wav"
            audio.play().catch((e)=>{});
       })
    }
}

export {
    AddSound
};