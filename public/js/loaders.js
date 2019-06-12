import SpriteSheet from './SpriteSheet.js';
import SoundBoard from './SoundBoard.js';

//locations (TODO maybe move these to a separate file or somehting)
//TODO probably move or REMOVE later (maybe make all creature's file name their type.json, maybe keep it this way to use different character versions or something?)
const creatureLocations = {
    "mushboy": "/characters/mushboyExample1.json",
    "testCharacter": "/characters/testCharacterExample1.json"
}

const levelLocations = {
    "level1": "/levels/testLevel.json"
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

//loads level json, makes creature factories
export async function loadLevel(levelName){
    const level = await loadJson(levelLocations[levelName]);

    if(level.spawners){
        let promisesArray;
        level.spawners.forEach( spawner => {
            promisesArray.push( loadCreature(spawner.type) );




            spawner.spawnRate
            spawner.spawnVariance
        })

        const resolvedPromises = await Promise.all(promisesArray);
    }
}

export async function loadCreature(creatureName){
    const creature = await loadJson(creatureLocations[creatureName]);

    if(creature.frames){
        
        //need to load the image file, then define the frames
        //loadFrames(creature.spriteSheetLocation, creature.frames);
    }

    if(creature.sounds){
        //load each sound in parallel and somehow associate the name with the action
        //loadSounds(creature.sounds)
    }

    if(creature.attributes){
        //cant decide if we need to return a "factory" here or just a function that creates a creature object or something else
        //const creatureFactory = new CreatureFactory(creature.name, creature.attributes)
    }
}

export function loadJson(path){
    return fetch(path)
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