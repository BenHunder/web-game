
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
        //random number between 0 and the spawnrate
        let j = Math.random() * this.spawnRate;

        //shift number back half of spawnrate
        j = j - (this.spawnRate/2);
        
        const spawnNext = Math.abs(this.spawnRate + (j * this.spawnVariance));
        console.log("spawn rate: " + this.spawnRate + " spawnNext: " + spawnNext);
        return spawnNext;
    }

    update(deltaTime){
        this.counter += deltaTime;
        if(this.counter >= this.spawnNext){
            this.spawn();
            this.counter = 0;
            this.spawnNext = this.calculateSpawnNext();
        }
    }

    spawn(){
        const cell = this.cellMap.randomAvailableCell();
        if(cell){
            cell.spawnNew(this.creatureFactory.create());
        }
    }
}