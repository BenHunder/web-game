import Compositor from './Compositor.js';
import {loadLevel, loadSpawners} from './loaders.js';
import {loadSprites} from './sprites.js';
import {createLayer1, createLayer2, createLayer3, createAllCells} from './entities.js';
import Timer from './Timer.js';
import Controller from "./Controller.js";
import Cell from './Cell.js';
import Player from './Player.js';
import Weapon from './Weapon.js';
import Food from './Food.js';
import Spawner from './Spawner.js'
 
let log = console.log;
const canvas = document.getElementById('gameCanvas').getContext('2d');

let cellMap;
let spawner;
let sprites;
let player1;
let paused = false;
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
        loadSprites(),
        loadSpawners('testSpawnerObject'),
        createLayer1(cellMap),
        createLayer2(cellMap),
        createLayer3(cellMap)
    ])
    .then(([sprts, spawners, layer1, layer2, layer3]) => {
        sprites = sprts;
        spawner = new Spawner(cellMap, sprites, spawners);

        const comp = new Compositor();
    
        comp.layers.push(layer1);
        comp.layers.push(layer2);
        comp.layers.push(layer3);

        player1 = new Player();
        const basicWeapon = new Weapon("basicWeapon", 10);
        const basicFood = new Food('basicFood', 10);
        player1.weapon = basicWeapon;
        player1.food = basicFood;
    
        const input = new Controller();

        input.addMapping(32, keyState => {
            if(keyState){
                toggleWeapon();
            }
        })
        input.addMapping(220, keyState => {
            if(keyState){
                togglePause();
            }
        })

        //map each key to the corresponding cell function
        const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        letters.forEach(key => {
            const cell = cellMap.get(key);
            input.addMapping(key.charCodeAt(0)-32, keyState => {
                if(keyState){
                    //cell.attack.start();
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
            spawner.update(deltaTime);
            comp.update(deltaTime);
            comp.draw(canvas);
        }else{

        }
    }
    
    timer.start();
}

initialize().then((comp) => start(comp));

