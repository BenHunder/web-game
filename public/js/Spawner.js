
import {getRandomInt} from './math.js';
import Sprite from './Sprite.js';

export default class Spawner{
    constructor(cellMap, sprites, spawners){
        this.cellMap = cellMap;
        this.sprites = sprites
        //TODO make the timing irregular
        this.spawnVariance;
        this.spawnRate;
        this.counter = 0;

        this.spawners = spawners.spawners;
        //keeps track of time since last spawn
        this.counters = new Array(spawners.spawners.length).fill(0);

        //specifies how much time until the next creature should spawn
        this.spawnNext = new Array(spawners.spawners.length);

        this.spawners.forEach((spawner, i) => {
            this.spawnNext[i] = this.calculateSpawnNext(spawner);
        })
    }

    calculateSpawnNext(spawner){
        let j = Math.random() * spawner.spawnRate;
        j = j - (spawner.spawnRate/2);
        //console.log(spawner.spawnRate, spawner.spawnVariance, j, spawner.spawnRate + (j * spawner.spawnVariance));
        return spawner.spawnRate + (j * spawner.spawnVariance);
    }

    update(deltaTime){
        this.spawners.forEach((spawner, i) => {
            this.counters[i] += deltaTime;
            if(this.counters[i] >= this.spawnNext[i]){
                this.spawn(spawner.properties);
                this.counters[i] = 0;
                this.spawnNext[i] = this.calculateSpawnNext(spawner);
            }
        });
    }

    spawn(properties){
        const availableCells = Array.from(this.cellMap).filter(([name,cell]) => !cell.isActive);

        if(availableCells.length > 0){
            const i = getRandomInt(availableCells.length);
            const cellPair = availableCells[i];
            const cell = cellPair[1];

            const sprite = new Sprite(this.sprites);
            sprite.isFriendly = properties.isFriendly;
            if(!cell.isActive){
                cell.setSprite(sprite);
                cell.spawn.start();
            }
        }
    }

    spawnRandom(){

        //filter out cells that are currently active. The cell.depth == cell.maxDepth part is to make sure tiles move down their pipe before spawning a new thing
        const availableCells = Array.from(this.cellMap).filter(([name,cell]) => !cell.isActive && cell.depth >= cell.maxDepth);

        if(availableCells.length > 0){
            const i = getRandomInt(availableCells.length);
            const cellPair = availableCells[i];
            const cell = cellPair[1];

            const sprite = new Sprite(this.sprites);
            const j = getRandomInt(10);
            if(j<2){sprite.isFriendly = true;}
            if(!cell.isActive){
                cell.setSprite(sprite);
                cell.spawn.start();
            }
        }
    }
}