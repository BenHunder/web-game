
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
        return this.spawnRate + (j * this.spawnVariance);
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