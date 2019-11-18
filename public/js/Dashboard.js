import Font from './Font.js';
import Layer from './Layer.js';

export default class Dashboard extends Layer{
    constructor(zIndex, font){
        super(zIndex);
        this.font = font;

        this.margin = 10;

        this.timer = 100;
        this.health = 50;
        this.level = 1;
        this.score = 0;
    }

    draw(context){
        this.drawTimer(context);
        this.drawHealth(context);
        this.drawLevel(context);
        this.drawScore(context);
    }

    //draws in the top left corner
    drawHealth(context){
        const string = 'health: ' + String(Math.floor(this.health));
        const x = this.margin;
        const y = this.margin;

        this.font.print(string, context, x, y);
    }

    //draws in the top right corner
    drawTimer(context){
        const string = 'time: ' + String(Math.floor(this.timer));
        const x = context.canvas.width - string.length * this.font.charWidth - this.margin;
        const y = context.canvas.height - this.font.charHeight - this.margin;

        this.font.print(string, context, x, y);
    }

    //draws in the bottom left corner
    drawLevel(context){
        const string = 'level: ' + String(this.level);
        const x = 10;
        const y = context.canvas.height - this.font.charHeight - this.margin;

        this.font.print(string, context, x, y);
    }

    //draws in the bottom right corner
    drawScore(context){
        const string = 'score: ' + String(this.score);
        const x = context.canvas.width - string.length * this.font.charWidth - this.margin;
        const y = this.margin;

        this.font.print(string, context, x, y);
    }

    update(deltaTime){
        this.timer -= deltaTime;
    }
}