import Font from './Font.js';
import Layer from './Layer.js';

export default class Dashboard extends Layer{
    constructor(zIndex, font){
        super(zIndex);
        this.font = font;

        //TODO: should I define margins or just define coordinates of different text elements
        this.leftMargin = 10;
        this.topMargin = 10;

        this.testLabel = 'TestTimer: ';
        this.testTimer = 50;
    }

    draw(context){
        this.font.print(this.testLabel + String(this.testTimer), context, this.leftMargin, this.topMargin);
    }

    update(deltaTime){
        this.testTimer -= deltaTime;
    }
}