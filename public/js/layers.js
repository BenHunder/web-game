import { loadImage } from './loaders.js';
import Cell from './Cell.js';
import { Vec2 } from './math.js';
import Layer from './Layer.js';

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

export function createPauseLayer(){
    const buffer = document.createElement('canvas');
    buffer.width = 640;
    buffer.height = 480;

    return loadImage('/img/PauseScreenMockUp.png').then(img => {
        buffer.getContext('2d').drawImage(img, 0, 0);
        return new Layer(5, undefined, buffer);
    });
}

export function createCell(name, center){
    //console.log('/img/' + name.toUpperCase() + '.png');
    return loadImage('/img/' + name.toUpperCase() + '.png').then(img => {
        const buffer = document.createElement('canvas');
        buffer.width = 640;
        buffer.height = 480;
        buffer.getContext('2d').drawImage(img, 0, 0);

        return new Cell(name, center, buffer)
    });
}

export function createAllCells(){
    return Promise.all([
        createCell('q', new Vec2(54.09, 279.81)),
        createCell('w', new Vec2(113.07, 279.81)),
        createCell('e', new Vec2(172.05, 279.81)),
        createCell('r', new Vec2(231.03, 279.81)),
        createCell('t', new Vec2(290.01, 279.81)),
        createCell('y', new Vec2(349.97, 279.81)),
        createCell('u', new Vec2(408.95, 279.81)),
        createCell('i', new Vec2(467.93, 279.81)),
        createCell('o', new Vec2(526.91, 279.81)),
        createCell('p', new Vec2(585.89, 279.81)),
        createCell('a', new Vec2(68.10, 316.93)),
        createCell('s', new Vec2(130.81, 316.93)),
        createCell('d', new Vec2(193.52, 316.93)),
        createCell('f', new Vec2(256.22, 316.93)),
        createCell('g', new Vec2(319.49, 316.93)),
        createCell('h', new Vec2(382.76, 316.93)),
        createCell('j', new Vec2(445.46, 316.93)),
        createCell('k', new Vec2(508.17, 316.93)),
        createCell('l', new Vec2(570.88, 316.93)),
        createCell('z', new Vec2(118.04, 359.06)),
        createCell('x', new Vec2(184.98, 359.06)),
        createCell('c', new Vec2(251.91, 359.06)),
        createCell('v', new Vec2(319.49, 359.06)),
        createCell('b', new Vec2(387.07, 359.06)),
        createCell('n', new Vec2(454.01, 359.06)),
        createCell('m', new Vec2(520.94, 359.06))

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
    //zIndex++;
    return loadImage('/img/Layer' + zIndex + '.png').then(img => {
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

export function createLayer4(){
    return createLayer('4', undefined).then(layer => {
        return layer;
    });
}

