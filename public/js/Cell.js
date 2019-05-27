import Attack from './traits/Attack.js';
import Feed from './traits/Feed.js';
import Spawn from './traits/Spawn.js';
import Weapon from './Weapon.js';
import Food from './Food.js';
import { soundBoard } from './main.js';

export default class Cell{
    constructor(name, center, buffer){
        this.name = name;
        this.center = center
        this.buffer = buffer;

        this.depth = 50;
        this.maxDepth = 50;
        this.speed = 50;
        this.duringSinkingAnimation = false;
        this.isActive = false;
        this.sprite = undefined;

        this.traits = [];

        this.addTrait(new Attack(this));
        this.addTrait(new Feed(this));
        this.addTrait(new Spawn(this));
        
    }

    draw(context){
        if(this.depth < this.maxDepth){
            context.drawImage(this.buffer, 0, 0+this.depth);
            if(!(this.sprite === undefined)){
                let x = this.center.x - 32/2;
                let y = this.center.y + this.depth - 32;
                //context.drawImage(this.sprite.buffer, x, y, 270, 238);
                context.drawImage(this.sprite.buffer, 0, 0, 270, 238, x, y, 32, 32);
                context.strokeStyle = this.sprite.isFriendly ? '#008000':'#f00';  // some color/style
                context.lineWidth = 2;         // thickness
                //context.strokeRect(x, y, 32, 32);
            }
        }
        //context.fillText(this.name, this.center.x - 20, this.center.y + 10);
    }

    update(deltaTime){
        this.traits.forEach(trait => {
            trait.update(deltaTime);
        });
    }

    setSprite(sprite){
        this.sprite = sprite;
    }

    addTrait(trait){
        this.traits.push(trait);
        this[trait.NAME] = trait;

    }

    //routes to appropriate trait based on held item and cell state
    interact(item){
        if(this.isActive){
            if(item instanceof Weapon){
                this.attack.start(item);
            }else if(item instanceof Food){
                this.feed.start(item);
            }
        }else{
            soundBoard.play('bonkOther');
        }
    }

    pressed(){
    }

    released(){
    }

    setSprite(sprite){
        this.sprite = sprite;
    }

    reset(){
        this.depth = 50;
        this.maxDepth = 50;
        this.speed = 50;
        this.duringSinkingAnimation = false;
        this.isActive = false;
        this.sprite = undefined;
    };
}