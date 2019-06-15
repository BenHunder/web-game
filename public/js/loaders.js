import SpriteSheet from './SpriteSheet.js';
import SoundBoard from './SoundBoard.js';
import { CreatureFactory } from './CreatureFactory.js';
import { Spawner } from './Spawner.js';

//locations (TODO maybe move these to a separate file or somehting)
//TODO probably move or REMOVE later (maybe make all creature's file name their type.json, maybe keep it this way to use different character versions or something?)
const creatureLocations = {
    "mushboy": "./characters/mushboy.json",
    "testCharacter": "./characters/testCharacter.json"
}

const levelLocations = {
    "level1": "./levels/testLevel1.json"
}


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

//loads level json, makes creature factories, returns and array of spawners TODO: create the spawner array and do something with it
export function loadLevel(cellMap, levelName){
    return loadJson(levelLocations[levelName])
    .then( level => {
        let promisesArray = [];
        level.spawners.forEach( spawner => {
            promisesArray.push( 
                loadCreature(spawner.type)
                .then( creatureFactory => {
                    const newSpawner = new Spawner(cellMap, creatureFactory, spawner.spawnRate, spawner.spawnVariance);
                    return newSpawner;
                })
            );
        });

        return Promise.all(promisesArray);
    });
}

//load all character properties (sounds, frames, attributes)
export function loadCreature(creatureName){
    return loadJson(creatureLocations[creatureName])
    .then( creature => {
        return Promise.all([
            loadFrames(creature.width, creature.height, creature.spriteSheetLocation, creature.frames),
            loadSounds(creature.sounds)
        ])
        .then( ([spriteSheet, soundBoard]) => {
            return new CreatureFactory(spriteSheet, soundBoard, creature.name, creature.width, creature.height, creature.attributes);
        });
    });
}

export function loadJson(path){
    return fetch(path)
    .then(r => {
        return r.json();
    }).then(res => {
        return res;
    })
}

//loads character sprite sheet and defines each frame
export function loadFrames(spriteWidth, spriteHeight, spriteSheetLocation, frames){
    return loadImage(spriteSheetLocation)
    .then(image => {
        const sprites = new SpriteSheet(image, spriteWidth, spriteHeight);
        frames.forEach( frame => {
            sprites.define(frame.name, ...frame.rect);
        });
        return sprites;
    })
}

//puts all promises from calling loadSounds in array and resolves together.
//not sure if this makes sense to do with audio elements, but I just want this function to wait until all audio is loaded
export async function loadSounds(soundNames){
    console.log("sounds", soundNames)
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
        return loadSound(soundName.location)
        .then(audio => {
            soundBoard.define(soundName.name, audio);
            return audio;
        });
    });

    const resolvedPromises = await Promise.all(promisesArray);
    return soundBoard;
}