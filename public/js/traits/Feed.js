import {Trait} from '../Creature.js/index.js';
import {soundBoard} from '../main.js';

export default class Feed extends Trait {
    constructor(cell){
        super('feed');

        this.cell = cell;
    }

    start(food){
        soundBoard.play('feed');

        this.cell.sprite.hunger += food.power;  
        if(this.cell.sprite.hunger > this.cell.sprite.maxHunger){
            this.cell.sprite.hunger = this.cell.sprite.maxHunger;
        }
    }

    kill(){
        this.cell.duringSinkingAnimation = true;
    }

    update(deltaTime){
        if(this.cell.isActive && this.cell.sprite.isFriendly){
            this.cell.sprite.hunger -= this.cell.sprite.hungerRate * deltaTime;
            if(!this.cell.duringSinkingAnimation && this.cell.sprite.hunger <= 0){
                this.cell.feed.kill();
            }
        }
    }
}