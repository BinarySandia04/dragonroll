import { initCustomFormatter, ref } from 'vue';

import Api from '@/services/Api'
import { GetCampaign } from './Dragonroll';
import { backendUrl } from './BackendURL';

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

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
}

// Ok aqui coses del mapa en si
let currentMap = {
    gridSize: undefined,
    images: [],
    lines_of_sight: [],
    backgroundColor: '#0f0f0f',
    title: "Untitled map"
};
let imageData = [];

const currentMapId = ref('');
let GetMapId = () => currentMapId;

let backgroundColor = ref('#0f0f0f');

function Draw(){
    let canvas = document.getElementById('tilemap');
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    imageData.forEach((image) => {
        ctx.drawImage(image, toMapX(0), toMapY(0), image.naturalWidth * scale, image.naturalHeight * scale);
    });


    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    currentMap.lines_of_sight.forEach((line) => {
        ctx.moveTo(toMapX(line[0].x * currentMap.gridSize), toMapY(line[0].y * currentMap.gridSize));
        ctx.lineTo(toMapX(line[1].x * currentMap.gridSize), toMapY(line[1].y * currentMap.gridSize));
    });
    ctx.stroke();

    if(currentMap.gridSize) drawGrid(currentMap.gridSize);
}

function ImportDD2VTT(data){
    var image = new Image();
    image.onload = function() {
        UploadResource(image).then((imagePath) => {
            currentMap.images.push(imagePath);
            CreateMap(currentMap);
            ReloadImages();
        })
    };

    currentMap.gridSize = data.resolution.pixels_per_grid;
    currentMap.lines_of_sight = data.line_of_sight;

    backgroundColor.value = '#' + data.environment.ambient_light;
    currentMap.backgroundColor = '#' + data.environment.ambient_light;

    xUpperLeft = data.resolution.map_origin.x * data.resolution.pixels_per_grid;
    yUpperLeft = data.resolution.map_origin.y * data.resolution.pixels_per_grid;
    xDownRight = xUpperLeft + data.resolution.map_size.x * data.resolution.pixels_per_grid;
    yDownRight = yUpperLeft + data.resolution.map_size.y * data.resolution.pixels_per_grid;
    
    image.src = "data:image/png;base64," + data.image;
}


const mapList = ref([]);
let GetMapList = () => mapList;

function UpdateMapList(){
    Api().get('/maps/list?campaign=' + GetCampaign()._id).then(response => {
        mapList.value = response.data.data;
        console.log(mapList.value);
    }).catch((err) => console.log(err));
}

function ReloadImages(){
    imageData = [];
    currentMap.images.forEach(path => {
        let image = new Image();
        image.src = backendUrl + "public/" + path;
        imageData.push(image);

        image.onload = Draw;
    });
}

function RenameMap(id, new_title){
    currentMap.title = new_title;
    SaveMap(id);
}

function SaveMap(id){
    Api().post('/maps/update?campaign=' + GetCampaign()._id + "&map=" + id, {data: currentMap}).then(response => {
        console.log("Map updated");
    }).catch(err => console.log(err));
}

function NewMap(){

}

function DeleteMap(map_id){

}

function LoadMap(map){
    currentMap = map.data;
    currentMapId.value = map._id;
    backgroundColor.value = currentMap.backgroundColor;
    ReloadImages();

}

function UploadResource(image){
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", dataURLtoFile(image.src));

        Api().post('/maps/create-resource?campaign=' + GetCampaign()._id, formData, {
            headers: { "Content-Type": "multipart/form-data"}
        }).then(response => {
            resolve(response.data.data);
        }).catch(err => console.log(err));
    });
}

function CreateMap(){
    Api().post('/maps/create', {
        campaign: GetCampaign()._id,
        data: currentMap,
    }).then(response => {
        UpdateMapList();
    }).catch(err => console.log(err));
    
}

let GetBackgroundColor = () => backgroundColor;
function ChangeBackgroundColor(color){
    backgroundColor.value = color; // XD
    currentMap.backgroundColor = color;
    SaveMap(currentMapId.value);
}

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
    ChangeBackgroundColor,
    GetMapId,

    UpdateMapList,
    GetMapList,
    LoadMap,
    RenameMap,
};