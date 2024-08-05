<script setup>
import { onMounted } from 'vue';


let offsetX = 0;
let offsetY = 0;
let scale = 1;

let mouseX = 0;
let mouseY = 0;


// Map coords -> Real coords
function toMapX(xReal) {
    return (xReal + offsetX) * scale;
}

function toMapY(yReal){
    return (yReal + offsetY) * scale;
}

// Real coords -> Map coords
function toRealX(xVirt){
    return xVirt / scale - offsetX;
}

function toRealY(yVirt){
    return yVirt / scale - offsetY;
}

function zoom(amount){
    let dx = ((mouseX) / scale - offsetX) - ((mouseX) / (scale * amount) - offsetX)
    let dy = ((mouseY) / scale - offsetY) - ((mouseY) / (scale * amount) - offsetY)
    scale *= amount;
    offsetX -= dx;
    offsetY -= dy;
    console.log(scale);
    draw();
}

function drawGrid(){
    let canvas = document.getElementById('tilemap');

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    let ctx = canvas.getContext("2d");

    let cellSize = 30;

    ctx.strokeStyle = "#434343";
    ctx.lineWidth = 1;

    ctx.beginPath();

    /* Vertical lines spanning the full width */
    for (let x = (offsetX % cellSize) * scale; x <= width; x += cellSize * scale) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }

    /* Horizontal lines spanning the full height */
    for (let y = (offsetY % cellSize) * scale; y <= height; y += cellSize * scale) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }

    ctx.stroke();

    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(toMapX(-10), toMapY(-10), 10 * scale, 10 * scale);
    ctx.stroke();
}

function draw(){
    let canvas = document.getElementById('tilemap');
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
}

onMounted(() => {
    let tilemap = document.getElementById("tilemap");
    tilemap.addEventListener("wheel", (event) => {
        let direction = 0;
        if(event.deltaY > 0) direction = 0.95;
        else if(event.deltaY < 0) direction = 1.05;

        zoom(direction);
    })

    let mouseDown = false;
    let startX = 0, startY = 0;
    let oldOffsetX = offsetX, oldOffsetY = offsetY;

    tilemap.addEventListener("mousedown", (event) => {
        mouseDown = true
        startX = event.clientX;
        startY = event.clientY;
        oldOffsetX = offsetX;
        oldOffsetY = offsetY;
    });

    tilemap.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        if(!mouseDown) return;
        offsetX = oldOffsetX + ((event.clientX - startX) * (1 / scale));
        offsetY = oldOffsetY + ((event.clientY - startY) * (1 / scale));

        draw();
        console.log("x: " + offsetX + ", y: " + offsetY);
    });

    tilemap.addEventListener("mouseup", () => mouseDown = false);

    addEventListener("resize", draw)
    draw();
});

</script>

<template>
    <canvas class="tilemap" id="tilemap"></canvas>
</template>

<style scoped lang="scss">
.tilemap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 0;
}
</style>