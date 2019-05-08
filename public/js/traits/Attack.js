import {Trait} from '../Sprite.js';

export default class Attack extends Trait {
    constructor(cell){
        super('attack');

        this.cell = cell;
    }

    start(weapon){
        this.cell.sprite.health -= weapon.power;
        if(this.cell.sprite.health <= 0){
            this.cell.attack.kill();
        }
    }

    kill(){
        this.cell.duringSinkingAnimation = true;
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