import SpriteSheet from './SpriteSheet.js'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890`~!@#$%^&*()_-+={}[]|\\:;"\'<,>.?/ '

export default class Font{
    constructor(image){

        this.spriteSheet = new SpriteSheet(image);
        this.charWidth = 18;
        this.charHeight = 32;
        this.rowLen = 26 * this.charWidth;

        for(let [index, char] of [...CHARS].entries()){
            const x = index * this.charWidth % this.rowLen;
            const y = Math.floor(index * this.charWidth / this.rowLen) * this.charHeight;

            this.spriteSheet.define(char, x, y, this.charWidth, this.charHeight);            
        }
    }

    print(text, context, x, y){
        [...text].forEach((char, index) => {
            console.log("drawing", char, index, x + index * this.charWidth, y);
            this.draw(char, context, x + index * this.charWidth, y);
        });
    }

    draw(char, context, x, y){
        console.log(arguments);
        context.drawImage(this.spriteSheet.getBuffer(char), x, y);
    }
}
