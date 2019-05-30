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
    return loadImage('/img/mushboy.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 50, 50);
        sprites.define('idle', 0, 0, 50, 50);
        return sprites
    })
}

//puts all promises from calling loadSounds in array and resloves together.
//not sure if this makes sense to do with audio elements, but I just want this function to wait until all audio is loaded
export async function loadSounds(soundNames){
    //this is the number of audio elements that will be created for each sound. the higher n, the greater the polyphony, the greater the load time
    const n = 3;

    let soundNamesTimesN = [];

    soundNames.forEach(soundName => {
        for(let i=0; i<n; i++){
            soundNamesTimesN.push(soundName);
        }
    })
    
    const soundBoard = new SoundBoard(n);

    const promisesArray = soundNamesTimesN.map(soundName => {
        return loadSound('/sfx/' + soundName.filename)
        .then(audio => {
            soundBoard.define(soundName.name, audio);
            return audio;
        });
    });

    const resolvedPromises = await Promise.all(promisesArray);
    return soundBoard;
}