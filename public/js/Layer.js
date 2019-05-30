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
        if(this.buffer){
            context.drawImage(this.buffer, 0, 0);
        }

        if(this.cells){
            this.cells.forEach(cell => {
                cell.draw(context);
            });
        }

    }

    update(deltaTime){
        if(this.cells){
            this.cells.forEach(cell => {
                cell.update(deltaTime);
            });
        }
    }

}