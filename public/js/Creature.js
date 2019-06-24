
export default class Creature{
    constructor(spriteSheet, soundBoard){
        this.spriteSheet = spriteSheet;
        this.soundBoard = soundBoard;
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
    
    playSound(name, delay=0){
        if(this.soundBoard.hasSound(name)){
            this.soundBoard.play(name, delay);
        }else{
            console.log(name + " sound missing");
        }
    }
}