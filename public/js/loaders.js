import SpriteSheet from './SpriteSheet.js';
import SoundBoard from './SoundBoard.js';

export function loadImage(url){
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () => {
            resolve(image);
        });
        image.src = url;
    });
}

export function loadSound(url){
    return new Promise(resolve => {
        const audio = new Audio();
        audio.addEventListener("canplaythrough", () => {
            resolve(audio);
        });
        audio.src = url;
    });
}

export function loadLevel(name){
    return fetch('/levels/' + name + '.json')
    .then(r => console.log(r));
}

export function loadSpawners(name){
    return fetch('/levels/' + name + '.json')
    .then(r => {
        return r.json();
    }).then(res => {
        return res;
    })
}

//async function that loads character sprite sheet and defines characters
export function loadSprites(){
    return loadImage('/img/character test.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('test-sprite', 0, 0, 270, 238);
        return sprites
    })
}

//puts all promises from calling loadSounds in array and resloves together.
//not sure if this makes sense to do with audio elements, but I just want this function to wait until all audio is loaded
export async function loadSounds(soundNames){
    const soundBoard = new SoundBoard();

    const promisesArray = soundNames.map(soundName => {
        return loadSound('/sfx/' + soundName.filename)
        .then(audio => {
            soundBoard.define(soundName.name, audio);
            return audio;
        });
    });

    const resolvedPromises = await Promise.all(promisesArray);
    return soundBoard;
}