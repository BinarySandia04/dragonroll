import { initCustomFormatter, ref } from 'vue';

let offsetX = 0;
let offsetY = 0;
let scale = 1;

let mouseX = 0;
let mouseY = 0;

function SetupTilemap(){
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

        Draw();
    });

    tilemap.addEventListener("mouseup", () => mouseDown = false);

    addEventListener("resize", Draw)

    offsetX = window.innerWidth / 2;
    offsetY = window.innerHeight / 2;

    Draw();
}

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
    Draw();
}

let xUpperLeft = -Infinity;
let yUpperLeft = -Infinity;
let xDownRight = Infinity;
let yDownRight = Infinity;

function drawGrid(cellSize){
    let canvas = document.getElementById('tilemap');

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    let ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#434343";
    ctx.lineWidth = 1;

    ctx.beginPath();

    for (let x = (offsetX % cellSize) * scale; x <= width; x += cellSize * scale) {
        if(toRealX(x) < xUpperLeft) continue;
        if(toRealX(x) > xDownRight) continue;

        ctx.moveTo(x, Math.max(0, toMapY(yUpperLeft)));
        ctx.lineTo(x, Math.min(height, toMapY(yDownRight)));
    }

    for (let y = (offsetY % cellSize) * scale; y <= height; y += cellSize * scale) {
        if(toRealY(y) < yUpperLeft) continue;
        if(toRealY(y) > yDownRight) continue;
        ctx.moveTo(Math.max(0, toMapX(xUpperLeft)), y);
        ctx.lineTo(Math.min(width, toMapX(xDownRight)), y);
    }
    

    ctx.stroke();

    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.rect(toMapX(-10), toMapY(-10), 10 * scale, 10 * scale);
    ctx.stroke();
}

// Ok aqui coses del mapa en si
let gridSize = 150;
let images = [];
let lines_of_sight = [];
let backgroundColor = ref('#0f0f0f');

function Draw(){
    let canvas = document.getElementById('tilemap');
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    images.forEach((image) => {
        ctx.drawImage(image, toMapX(0), toMapY(0), image.naturalWidth * scale, image.naturalHeight * scale);
    });


    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    lines_of_sight.forEach((line) => {
        ctx.moveTo(toMapX(line[0].x * gridSize), toMapY(line[0].y * gridSize));
        ctx.lineTo(toMapX(line[1].x * gridSize), toMapY(line[1].y * gridSize));
    });
    ctx.stroke();

    drawGrid(gridSize);
}

function ImportDD2VTT(data){
    console.log(data);

    var image = new Image();
    image.onload = function() {
        images.push(image);
        Draw();
    };

    gridSize = data.resolution.pixels_per_grid;
    lines_of_sight = data.line_of_sight;
    backgroundColor.value = '#' + data.environment.ambient_light;

    xUpperLeft = data.resolution.map_origin.x * data.resolution.pixels_per_grid;
    yUpperLeft = data.resolution.map_origin.y * data.resolution.pixels_per_grid;
    xDownRight = xUpperLeft + data.resolution.map_size.x * data.resolution.pixels_per_grid;
    yDownRight = yUpperLeft + data.resolution.map_size.y * data.resolution.pixels_per_grid;
    

    image.src = "data:image/png;base64," + data.image;

}

let GetBackgroundColor = () => backgroundColor;

export {
    toMapX,
    toMapY,
    toRealX,
    toRealY,
    zoom,

    SetupTilemap,
    // Draw,
    ImportDD2VTT,
    GetBackgroundColor,
};