import {loadImage} from './loaders.js';

export function createBackgroundLayer(){
    const buffer = document.createElement('canvas');
    buffer.width = 640;
    buffer.height = 480;

    loadImage('/img/game-layout2.png').then(img => {
        buffer.getContext('2d').drawImage(img, 0, 0);
        console.log(buffer.src);
        return function drawBackgroundLayer(context) {
            context.drawImage(buffer, 0, 0);
        }
    });
}

//this is a one character layer right now, will need to modify for multiple characters
export function createCharacterLayer(entity){
    return function drawCharacterLayer(context){
        entity.draw(context);
    }
}

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for(let x = x1; x < x2; ++x){
            for(let y = y1; y < y2; ++y){
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    })
}