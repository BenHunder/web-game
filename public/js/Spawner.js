
import {getRandomInt} from './math.js';

//TODO this is an aggregation of spawners, need and individual spawner class

export class Spawner{
    constructor(cellMap, creatureFactory, spawnRate, spawnVariance){
        this.cellMap = cellMap;
        this.creatureFactory = creatureFactory;
        this.spawnRate = spawnRate;
        this.spawnVariance = spawnVariance;
        this.counter = 0;
        this.spawnNext = this.calculateSpawnNext();
    }

    calculateSpawnNext(spawner){
        let j = Math.random() * this.spawnRate;
        j = j - (this.spawnRate/2);
        //console.log(spawner.spawnRate, spawner.spawnVariance, j, spawner.spawnRate + (j * spawner.spawnVariance));
        return this.spawnRate + (j * this.spawnVariance);
    }

    update(deltaTime){
        this.counter += deltaTime;
        if(this.counter >= this.spawnNext){
            this.spawn();
            this.counters = 0;
            this.spawnNext = this.calculateSpawnNext();
        }
    }

    spawn(){
        const availableCells = Array.from(this.cellMap).filter(([name,cell]) => !cell.isActive);
        if(availableCells.length > 0){
            const i = getRandomInt(availableCells.length);
            const cellPair = availableCells[i];
            const cell = cellPair[1];

            if(!cell.isActive){
                const newCreature = this.creatureFactory.create();
                console.log({newCreature});
                cell.setCreature(newCreature);
                cell.spawn.start();
            }
        }
    }
}