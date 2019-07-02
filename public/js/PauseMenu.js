import Font from './Font.js';
import Layer from './Layer.js';

export default class PauseMenu extends Layer{
    constructor(zIndex, font){
        super(zIndex);
        this.font = font;
        this.x = 250;
        this.y = 125;
        this.margin = 10;

        //TODO: once art is created for pause menu, that should be stored here and drawn
        //this.backgroundImage = backgroundImage;

        this.options = [
            {
                'label': 'resume'
            },
            {
                'label': 'start over'
            },
            {
                'label': 'quit'
            }
        ]
    }

    draw(context){
        this.options.forEach((option, index) => {
            const x = this.x + this.margin;
            const y = this.y + this.margin + this.font.charHeight * index * 2;
            this.font.print(option.label, context, x, y);
        });
    }

    update(deltaTime){
    }
}