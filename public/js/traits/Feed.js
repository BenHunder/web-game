import Trait from '../Trait.js';
import {soundBoard} from '../main.js';

export default class Feed extends Trait {
    constructor(cell){
        super('feed');

        this.cell = cell;
    }

    start(food){
        soundBoard.play('feed');

        this.cell.creature.hunger += food.power;  
        if(this.cell.creature.hunger > this.cell.creature.maxHunger){
            this.cell.creature.hunger = this.cell.creature.maxHunger;
        }
    }

    kill(){
        this.cell.duringSinkingAnimation = true;
    }

    update(deltaTime){
        if(this.cell.isActive && this.cell.creature.isFriendly){
            this.cell.creature.hunger -= this.cell.creature.hungerRate * deltaTime;
            if(!this.cell.duringSinkingAnimation && this.cell.creature.hunger <= 0){
                this.cell.feed.kill();
            }
        }
    }
}