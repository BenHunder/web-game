export default class Compositor{
    constructor(){
        this.layers = [];  
        this.pauseLayer = null;    
        this.paused = false;  
    }

    draw(context) {
        this.layers.forEach(layer => {
            layer.draw(context);
        })
    }

    drawPauseLayer(context){
        this.pauseLayer.draw(context);
    }

    update(deltaTime){
        this.layers.forEach(layer => {
            layer.update(deltaTime)
        });
    }

    setPauseLayer(pauseLayer){
        this.pauseLayer = pauseLayer;
    }
    

}