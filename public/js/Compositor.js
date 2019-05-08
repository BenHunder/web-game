export default class Compositor{
    constructor(){
        this.layers = [];
    }

    draw(context) {
        this.layers.forEach(layer => {
            layer.draw(context);
        })
    }

    update(deltaTime){
        this.layers.forEach(layer => {
            layer.update(deltaTime)
        });
    }
}