import {Trait} from '../Sprite.js';

export default class Spawn extends Trait {
    constructor(cell){
        super('spawn');

        this.cell = cell;
    }

    start(){
        this.cell.isActive = true;
    }

    update(deltaTime){
        if(this.cell.isActive && (!this.cell.duringSinkingAnimation) && (this.cell.depth > 0)){
            this.cell.depth -= this.cell.speed * deltaTime;
        }
        
    }
}