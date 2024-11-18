import { Application, Filter, Assets, GlProgram, Graphics, Shader, Sprite, UniformGroup } from "pixi.js";
import { GetFile } from "./Resources";

let shaders = {}

async function loadShaderSource(shaderUrl){
    if(Object.keys(shaders).includes(shaderUrl)) return shaders[shaderUrl];
    let shader = await GetFile(`/shaders/${shaderUrl}`);
    shaders[shaderUrl] = shader;
    return shader;
}

async function loadFilter(fragUrl, vertUrl, resources){
    // console.log(await loadShaderSource(fr));
    const filter = new Filter({
        glProgram: GlProgram.from({
            vertex: await loadShaderSource(vertUrl),
            fragment: await loadShaderSource(fragUrl)
        }),
        resources
    });

    return filter;
}

async function drawGrid(app){

    // Data que es passa per uniforms
    let resources = {
        data: {
            uColor: {value: [1,0,0,1], type: 'vec4<f32>'},
            uTest: {value: 0.1, type: 'f32'}
        }
    }

    let gridShader = await loadFilter('grid.frag', 'grid.vert', resources);

    // Data que es pot modificar per uniforms
    gridShader.resources.data.uniforms.uTest += 0.1;
    
    let obj = new Graphics().rect(-window.innerWidth / 2, -window.innerHeight / 2, window.innerWidth, window.innerHeight).fill();
    obj.filters = [ gridShader ];

    
    app.stage.addChild(obj);
    obj.position = {x: 100, y: 1000};
    console.log("Hola")
}

function Setup(){
    (async () => {
        const app = new Application();

        await app.init({
            backgroundAlpha: 0,
            resizeTo: window,
            preference: 'webgl'
        });

        document.getElementById('tilemap-container').appendChild(app.canvas);


        const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

        // Create a new Sprite from an image path
        const bunny = new Sprite(texture);

        // Add to stage
        app.stage.addChild(bunny);

        // Center the sprite's anchor point
        bunny.anchor.set(0.5);

        // Move the sprite to the center of the screen
        bunny.x = app.screen.width / 2;
        bunny.y = app.screen.height / 2;

        await drawGrid(app);

        app.ticker.add((time) => {
            bunny.rotation += 0.1 * time.deltaTime;
        });
    })();
}

export default {
    Setup
}