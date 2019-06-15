import Creature from "./Creature.js";
import Trait from "./Trait.js";

//do we need this? or do we just need to pass a function that returns a new creature or something. i am getting confused. this factory thing seems like a lot of unnecessary work

export class CreatureFactory{
    //TODO should spriteSheet and soundBoard really be passed in here? If so, creature should have a function to play sounds like its draw method 
    constructor(spriteSheet, soundBoard, name, width, height, attributes){
        this.spriteSheet = spriteSheet;
        this.soundBoard = soundBoard;
        this.name = name;
        this.width = width;
        this.height = height;
        this.health = attributes.health || 20;
        this.hunger = attributes.hunger || 20;
        this.maxHunger = attributes.maxHunger || 20;
        this.hungerRate = attributes.hungerRate || 1;
        this.isFriendly = false;
        
        this.traits = attributes.traits || [];

    }

    create(){
        let creature = new Creature(this.spriteSheet, this.soundBoard);
        creature.name = this.name;
        creature.width = this.width;
        creature.height = this.height;
        creature.health = this.health;
        creature.hunger = this.hunger;
        creature.maxHunger = this.maxHunger;
        creature.hungerRate = this.hungerRate;
        creature.isFriendly = this.isFriendly;

        this.traits.forEach( traitName => {
            //TODO eventually traits will be defined in the JSON or somehting I guess, but for now, they are just strings. This line is pretty useless rn
            creature.addTrait(new Trait(traitName));
        });

        return creature;
    }
}