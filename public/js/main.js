import Compositor from './Compositor.js';
import {loadLevel, loadSounds} from './loaders.js';
import {createLayer1, createLayer2, createLayer3, createLayer4, createPauseLayer, createAllCells} from './layers.js';
import Timer from './Timer.js';
import Controller from "./Controller.js";
import Cell from './Cell.js';
import Player from './Player.js';
import Weapon from './Weapon.js';
import Food from './Food.js';
 
let log = console.log;
const canvas = document.getElementById('gameCanvas').getContext('2d');

let cellMap;
let spawnerSet;

//TODO
//these might eventually be contained in sprite class? a sprite will need it's own sprite sheet (for each of the animation frames). And I guess it will have its own sounds, so it will need it's own sound board as well.
//the thing is... each sprite of the SAME TYPE can share a sprite sheet and sound board, but they can't share health and stuff
export let soundBoard;
//export let spriteBoard;

//TODO probably move to another file later
const soundNames = [
    {
        "filename": "sfx1.wav", 
        "name": "bonkEnemy"
    },
    {
        "filename": "sfx2.wav",
        "name": "bonkOther"
    },
    {
        "filename": "sfx3.wav", 
        "name": "feed"
    },
    {
        "filename": "sfx4.wav", 
        "name": "kill"
    }
];


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

    return Promise.all([
        //loadJson('/levels/testSpawnerObject.json'),
        loadLevel(cellMap, "level1"),
        loadSounds(soundNames),
        createPauseLayer(),
        createLayer1(cellMap),
        createLayer2(cellMap),
        createLayer3(cellMap),
        createLayer4()
    ])
    .then(([spawners, sndBrd, pauseLayer, layer1, layer2, layer3, layer4]) => {
        //spriteBoard = sprites;
        soundBoard = sndBrd;
        spawnerSet = spawners;

        const comp = new Compositor();
        
        comp.layers.push(layer1);
        comp.layers.push(layer2);
        comp.layers.push(layer3);
        comp.layers.push(layer4);
        comp.setPauseLayer(pauseLayer);

        player1 = new Player();
        const basicWeapon = new Weapon("basicWeapon", 10);
        const basicFood = new Food('basicFood', 10);
        player1.weapon = basicWeapon;
        player1.food = basicFood;
    
        const input = new Controller();

        // spacebar switches weapon and food and vice versa
        input.setMapping(32, keyState => {
            if(keyState){
                toggleWeapon();
            }
        });

        // \ pauses and unpauses
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
        const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        letters.forEach(key => {
            const cell = cellMap.get(key);
            input.setMapping(key.charCodeAt(0)-32, keyState => {
                if(keyState){
                    //cell.attack.start();
                    //soundBoard.play('bonkEnemy');
                    cell.interact(onWeapon ? player1.weapon : player1.food);
                }else{
                    cell.released();
                }
            });
        });
        input.listenTo(window);


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

