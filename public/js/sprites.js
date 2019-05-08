import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

//async function that loads character sprite sheet and defines characters
export function loadSprites(){
    return loadImage('/img/character test.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('test-sprite', 0, 0, 270, 238);
        return sprites
    })
}

//async function that loads background sprite sheet and defines tiles
export function loadBackgroundSprites(){
    return loadImage('/img/tile.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites
    });
}