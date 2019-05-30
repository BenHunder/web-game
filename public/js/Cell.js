import Attack from './traits/Attack.js';
import Feed from './traits/Feed.js';
import Spawn from './traits/Spawn.js';
import Weapon from './Weapon.js';
import Food from './Food.js';
import { soundBoard } from './main.js';
import { spriteBoard } from './main.js';

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
        this.sprite = null;

        this.traits = [];

        this.addTrait(new Attack(this));
        this.addTrait(new Feed(this));
        this.addTrait(new Spawn(this));
        
    }

    //TODO if draw coordinates aren't whole numbers the tile/sprites will look blurry. using math.ceil here to avoid that, but I wonder if there is a better solution
    draw(context){
        if(this.depth < this.maxDepth){
            context.drawImage(this.buffer, 0, Math.ceil(this.depth));
            if(this.sprite){
                this.drawSprite(context);
                //context.strokeStyle = this.sprite.isFriendly ? '#008000':'#f00';  // some color/style
                //context.lineWidth = 2;         // thickness
                //context.strokeRect(x, y, 32, 32);
            }
        }
        //context.fillText(this.name, this.center.x - 20, this.center.y + 10);
    }

    //provides coordinates so it appears that the sprite is standing in the center of the tile using the sprites dimensions
    //TODO is this where the animation frame name would be passed in?
    drawSprite(context, frameName='idle'){
        const yOffset = 10;
        //rounds down to whole number so sprites aren't drawn looking blurry
        const x = Math.ceil(this.center.x) - this.sprite.width/2;
        const y = Math.ceil(this.center.y) + Math.ceil(this.depth) - this.sprite.height + yOffset;

        this.sprite.draw(context, frameName, x, y);

    }

    update(deltaTime){
        this.traits.forEach(trait => {
            trait.update(deltaTime);
        });
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
        this.sprite = null;
    };
}