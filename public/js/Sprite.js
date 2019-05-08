import {Vec2} from './math.js';

export class Trait {
    constructor(name){
        this.NAME = name;
    }

    update(){
        console.warn("unhandled update call in Trait");
    }
}

export default class Sprite{
    constructor(buffer){
        this.buffer = buffer;
        this.health = 20;
        this.hunger = 20;
        this.maxHunger = 20;
        this.hungerRate = 1;
        this.isFriendly = false;
        
        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime){
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        })
    } 

}