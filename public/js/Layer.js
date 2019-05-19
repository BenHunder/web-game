import {loadImage} from "./loaders.js";
import SpriteSheet from "./SpriteSheet.js";

export default class Layer{
    constructor(zIndex, cells, buffer){
        console.log(zIndex, cells);
        this.zIndex = zIndex;
        this.cells = cells;
        this.buffer = buffer;
    }

    draw(context){
        if(!(this.buffer === undefined)){
            context.drawImage(this.buffer, 0, 0);
        }

        if(!(this.cells === undefined)){
            this.cells.forEach(cell => {
                cell.draw(context);
            });
        }

    }

    update(deltaTime){
        if(!(this.cells === undefined)){
            this.cells.forEach(cell => {
                cell.update(deltaTime);
            });
        }
    }

}