export default class Compositor{
    constructor(){
        this.layers = [];  
        this.pauseMenu = null;    
        this.paused = false;  
    }

    draw(context) {
        this.layers.forEach(layer => {
            layer.draw(context);
        })
    }

    drawPauseMenu(context){
        this.pauseMenu.draw(context);
    }

    update(deltaTime){
        this.layers.forEach(layer => {
            layer.update(deltaTime)
        });
    }

    setPauseMenu(pauseMenu){
        this.pauseMenu = pauseMenu;
    }
    

}