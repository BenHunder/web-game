
export default class Creature{
    constructor(spriteSheet){
        this.spriteSheet = spriteSheet;
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

    draw(context, name, x, y){
        const buffer = this.spriteSheet.getBuffer(name);
        context.drawImage(buffer, x, y);
    }
}