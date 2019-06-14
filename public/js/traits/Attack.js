import Trait from '../Trait.js';
import {soundBoard} from '../main.js';

export default class Attack extends Trait {
    constructor(cell){
        super('attack');

        this.cell = cell;
    }

    start(weapon){
        if(!this.cell.duringSinkingAnimation){
            soundBoard.play('bonkEnemy');

            this.cell.creature.health -= weapon.power;
            if(this.cell.creature.health <= 0){
                this.cell.attack.kill();
            }
        }
    }

    kill(){
        if(!this.cell.duringSinkingAnimation){
            soundBoard.play('kill');
            this.cell.duringSinkingAnimation = true;
        }
    }

    update(deltaTime){
        if(this.cell.duringSinkingAnimation && this.cell.depth < this.cell.maxDepth){
            this.cell.depth += this.cell.speed * deltaTime;
        }else if(this.cell.duringSinkingAnimation && this.cell.depth >= this.cell.maxDepth){
            this.cell.duringSinkingAnimation = false;
            this.cell.isActive = false;
        }
    }
}