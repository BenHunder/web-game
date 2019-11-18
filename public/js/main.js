import Compositor from './Compositor.js';
import {loadLevel, loadSounds, loadFont} from './loaders.js';
import {createLayer1, createLayer2, createLayer3, createLayer4, createLayer5, createPauseMenuLayer, createAllCells, createDashboardLayer} from './layers.js';
import Timer from './Timer.js';
import Controller from "./Controller.js";
import Cell from './Cell.js';
import Player from './Player.js';
import Weapon from './Weapon.js';
import Food from './Food.js';
 
let log = console.log;
const canvas = document.getElementById('gameCanvas').getContext('2d');

//shows the mouse coordinates in chrome
document.onmousemove = function(e){
    var x = e.pageX;
    var y = e.pageY;
    e.target.title = "X is "+x+" and Y is "+y;
};

function resizeGame() {
    const gameContainer = document.getElementById('gameContainer');
    const widthToHeight = 16 / 9;
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;
    let newWidthToHeight = newWidth / newHeight;
    
    console.log(newWidthToHeight, widthToHeight)
    if (newWidthToHeight > widthToHeight) {
        console.log({newWidth})
        console.log({newHeight})
        console.log({newWidthToHeight})
        newWidth = newHeight * widthToHeight;
        console.log("-----");
        console.log({newWidth})
        gameContainer.style.height = newHeight + 'px';
        gameContainer.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameContainer.style.width = newWidth + 'px';
        gameContainer.style.height = newHeight + 'px';
    }
    
    //gameContainer.style.marginTop = (-newHeight / 2) + 'px';
    gameContainer.style.marginLeft = (-newWidth / 2) + 'px';
    
    const gameCanvas = document.getElementById('gameCanvas');
    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;
}

//resizeGame();
//window.addEventListener('resize', resizeGame, false);
//window.addEventListener('orientationchange', resizeGame, false);

export let cellMap;
let spawnerSet;

export let globalSoundBoard;

//TODO probably move to another file later
const soundNames = [
    {
        "location": "/assets/sfx/sfx1.wav", 
        "name": "bonkEnemy"
    },
    {
        "location": "/assets/sfx/sfx2.wav",
        "name": "bonkOther"
    },
    {
        "location": "/assets/sfx/sfx3.wav", 
        "name": "feed"
    }
];

const fontData = [
    {
        'name': 'manaspace',
        'location': '../assets/img/fonts/manaspace/manaspace.png',
        'charWidth': 16,
        'charHeight': 24
    },
    {
        'name': 'lunchtime',
        'location': '../assets/img/fonts/lunchtime/lunchtime.png',
        'charWidth': 18,
        'charHeight': 32
    }
]

let player1;
let paused = false;
let pauseOptions = [togglePause, resetMap];
let pauseIndex = 0;
let onWeapon = true;
function toggleWeapon(){
    onWeapon = !onWeapon;
}
function togglePause(){
    paused = !paused;
}



async function initialize(){
    cellMap = await createAllCells();
    const font = await loadFont(fontData[0]);

    return Promise.all([
        //loadJson('/assets/levels/testSpawnerObject.json'),
        loadLevel(cellMap, "level1"),
        loadSounds(soundNames),
        createLayer1(cellMap),
        createLayer2(cellMap),
        createLayer3(cellMap),
        createLayer4(),
        createLayer5(),
        createDashboardLayer(font),
        createPauseMenuLayer(font),
    ])
    .then(([spawners, sndBrd, layer1, layer2, layer3, layer4, layer5, dashboardLayer, pauseLayer]) => {
        globalSoundBoard = sndBrd;
        spawnerSet = spawners;

        const comp = new Compositor();
        
        comp.layers.push(layer1);
        comp.layers.push(layer2);
        comp.layers.push(layer3);
        comp.layers.push(layer4);
        comp.layers.push(layer5);
        comp.layers.push(dashboardLayer);
        comp.setPauseLayer(pauseLayer);
    
        const input = new Controller();

        // spacebar switches weapon and food and vice versa
        //TODO make setMapping take a character instead of the keycode
        input.setMapping(32, keyState => {
            if(keyState){
                toggleWeapon();
            }
        });

        // enter pauses and unpauses
        input.setMapping(13, keyState => {
            if(keyState){
                togglePause();
            }
        });

        // down arrow switches menu option (changes enter key to reset then, back to toggle pause)
        //TODO create an array of pause menu options that arrows will cycle through
        input.setMapping(40, keyState => {
            if(keyState){
                if(paused){
                    input.setMapping(13, keyState => {
                        if(keyState){
                            resetMap(); 
                            togglePause();
                            input.setMapping(13, keyState => {
                                if(keyState){
                                    togglePause();
                                }
                            });
                        }
                    });
                }
            }
        });

        //map each key to the corresponding cell function
        const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','[',']',';','\'','\,','.','/'];
        const keyCodes = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,219,221,186,222,188,190,191];
        letters.forEach((key, n) => {
            const cell = cellMap.get(key);
            input.setMapping(keyCodes[n], keyState => {
                if(keyState){
                    cell.interact(onWeapon ? player1.weapon : player1.food);
                }else{
                    cell.released();
                }
            });
        });
        input.listenTo(window);

        log("cellMap initialized:\n", {cellMap});
        return comp;
    });
}



function start(comp){

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime){
        if(!paused){
            spawnerSet.forEach( spawner => spawner.update(deltaTime));
            comp.update(deltaTime);
            comp.draw(canvas);
        }else{
            comp.drawPauseLayer(canvas);
        }
    }
    
    timer.start();
}

initialize().then((comp) => start(comp));

function resetMap(){
    cellMap.forEach(cell => {
        cell.reset();
    });
    paused = false;
}

