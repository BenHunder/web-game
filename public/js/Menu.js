import Font from './Font.js';
import Layer from './Layer.js';

export default class Menu extends Layer{
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

        this.selected = 0;
    }

    scrollDown(){
        this.selected = (this.selected + 1) % this.options.length
    }

    scrollUp(){
        this.selected = this.selected - 1;
        if(this.selected < 0){
            this.selected = this.options.length -1;
        }
    }

    selectedOption(){
        return this.options[this.selected].label;
    }

    draw(context){
        this.options.forEach((option, index) => {
            const x = this.x + this.margin;
            const y = this.y + this.margin + this.font.charHeight * index * 2;

            //add ">" to selected line
            let line = index === this.selected ? "> " + option.label: option.label;  
            this.font.print(line, context, x, y);
        });
    }

    update(deltaTime){
    }
}