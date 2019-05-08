import Sprite from './Sprite.js';
import Velocity from './traits/Velocity.js';
import {loadSprites} from './sprites.js';
import { loadImage } from './loaders.js';
import Cell from './Cell.js';
import {Vec2} from './math.js';
import Layer from './Layer.js';

export function createBen(){
    return loadSprites()
    .then(sprite => {
        const ben = new Sprite();

        ben.addTrait(new Velocity());

        ben.draw = function drawBen(context){
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }
        // ben.update = function updateBen(deltaTime){
        //     this.pos.x += this.vel.x * deltaTime;
        //     this.pos.y += this.vel.y * deltaTime;
        // }


        return ben;
    });
    
}

export function createCell(name, center){
    //return loadImage('/img/' + name + '-01.png').then(img => {
        return loadImage('/img/character test.png').then(img => {
        const buffer = document.createElement('canvas');
        buffer.width = 640;
        buffer.height = 480;
        buffer.getContext('2d').drawImage(img, 0, 0);

        return new Cell(name, center, buffer)
    });
}

export function createTestSprite(){

}
export function createAllCells(){
    return Promise.all([
        createCell('q', new Vec2(54.09, 259.81)),
        createCell('w', new Vec2(113.07, 259.81)),
        createCell('e', new Vec2(172.05, 259.81)),
        createCell('r', new Vec2(231.03, 259.81)),
        createCell('t', new Vec2(290.01, 259.81)),
        createCell('y', new Vec2(349.97, 259.81)),
        createCell('u', new Vec2(408.95, 259.81)),
        createCell('i', new Vec2(467.93, 259.81)),
        createCell('o', new Vec2(526.91, 259.81)),
        createCell('p', new Vec2(585.89, 259.81)),
        createCell('a', new Vec2(68.10, 296.93)),
        createCell('s', new Vec2(130.81, 296.93)),
        createCell('d', new Vec2(193.52, 296.93)),
        createCell('f', new Vec2(256.22, 296.93)),
        createCell('g', new Vec2(319.49, 296.93)),
        createCell('h', new Vec2(382.76, 296.93)),
        createCell('j', new Vec2(445.46, 296.93)),
        createCell('k', new Vec2(508.17, 296.93)),
        createCell('l', new Vec2(570.88, 296.93)),
        createCell('z', new Vec2(118.04, 339.06)),
        createCell('x', new Vec2(184.98, 339.06)),
        createCell('c', new Vec2(251.91, 339.06)),
        createCell('v', new Vec2(319.49, 339.06)),
        createCell('b', new Vec2(387.07, 339.06)),
        createCell('n', new Vec2(454.01, 339.06)),
        createCell('m', new Vec2(520.94, 339.06))

    //]).then(([q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m]) => {
    ]).then((cells) => {
        const cellMap = new Map();
        cells.forEach(cell => {
            cellMap.set(cell.name, cell);
        })

        return cellMap
    });
}

function createLayer(zIndex, cells){
    return loadImage('/img/' + zIndex + '-01.png').then(img => {
        const buffer = document.createElement('canvas');
        buffer.width = 640;
        buffer.height = 480;
        buffer.getContext('2d').drawImage(img, 0, 0);

        return new Layer(zIndex, cells, buffer);
    });
}

export function createLayer1(cellMap){
    return createLayer('1', [
        cellMap.get('q'),
        cellMap.get('w'),
        cellMap.get('e'),
        cellMap.get('r'),
        cellMap.get('t'),
        cellMap.get('y'),
        cellMap.get('u'),
        cellMap.get('i'),
        cellMap.get('o'),
        cellMap.get('p')
        ])
    .then(layer => {
        return layer;
    });
}

export function createLayer2(cellMap){
    return createLayer('2', [
        cellMap.get('a'),
        cellMap.get('s'),
        cellMap.get('d'),
        cellMap.get('f'),
        cellMap.get('g'),
        cellMap.get('h'),
        cellMap.get('j'),
        cellMap.get('k'),
        cellMap.get('l')
        ])
    .then(layer => {
        return layer;
    });
}

export function createLayer3(cellMap){
    return createLayer('3', [
        cellMap.get('z'),
        cellMap.get('x'),
        cellMap.get('c'),
        cellMap.get('v'),
        cellMap.get('b'),
        cellMap.get('n'),
        cellMap.get('m')
        ])
    .then(layer => {
        return layer;
    });
}

