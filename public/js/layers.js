import { loadImage } from './loaders.js';
import { loadFont } from './loaders.js';
import Cell from './Cell.js';
import CellMap from './CellMap.js'
import { Vec2 } from './math.js';
import Layer from './Layer.js';
import Font from './Font.js';
import Dashboard from './Dashboard.js'
import PauseMenu from './PauseMenu.js';

const gameWidth = 640;
const gameHeight = 480;

export function createBackgroundLayer(){
    const buffer = document.createElement('canvas');
    buffer.width = gameWidth;
    buffer.height = gameHeight;

    loadImage('/img/game-layout2.png').then(img => {
        buffer.getContext('2d').drawImage(img, 0, 0);
        console.log(buffer.src);
        return function drawBackgroundLayer(context) {
            context.drawImage(buffer, 0, 0);
        }
    });
}

//right now this functinon is not asynchronous, but it probably will be because icons and other images will be added
export function createDashboardLayer(font){
 
    return new Dashboard(5, font);
}

//right now this functinon is not asynchronous, but it probably will be because icons and other images will be added
export function createPauseMenuLayer(font){
    const buffer = document.createElement('canvas');
    buffer.width = gameWidth;
    buffer.height = gameHeight;

    return loadImage('/img/PauseScreenMockUp.png').then(img => {
        return new PauseMenu(6, font);
    });
}

export function createCell(name, coordinates, center){
    return loadImage('/img/' + name.toUpperCase() + '.png').then(img => {
        const buffer = document.createElement('canvas');
        buffer.width = gameWidth;
        buffer.height = gameHeight;
        buffer.getContext('2d').drawImage(img, 0, 0);

        return new Cell(name, coordinates, center, buffer)
    });
}

export function createAllCells(){
    return Promise.all([
        createCell('q', new Vec2(0,0), new Vec2(54.09, 279.81)),
        createCell('w', new Vec2(1,0), new Vec2(113.07, 279.81)),
        createCell('e', new Vec2(2,0), new Vec2(172.05, 279.81)),
        createCell('r', new Vec2(3,0), new Vec2(231.03, 279.81)),
        createCell('t', new Vec2(4,0), new Vec2(290.01, 279.81)),
        createCell('y', new Vec2(5,0), new Vec2(349.97, 279.81)),
        createCell('u', new Vec2(6,0), new Vec2(408.95, 279.81)),
        createCell('i', new Vec2(7,0), new Vec2(467.93, 279.81)),
        createCell('o', new Vec2(8,0), new Vec2(526.91, 279.81)),
        createCell('p', new Vec2(9,0), new Vec2(585.89, 279.81)),
        createCell('a', new Vec2(0,1), new Vec2(68.10, 316.93)),
        createCell('s', new Vec2(1,1), new Vec2(130.81, 316.93)),
        createCell('d', new Vec2(2,1), new Vec2(193.52, 316.93)),
        createCell('f', new Vec2(3,1), new Vec2(256.22, 316.93)),
        createCell('g', new Vec2(4,1), new Vec2(319.49, 316.93)),
        createCell('h', new Vec2(5,1), new Vec2(382.76, 316.93)),
        createCell('j', new Vec2(6,1), new Vec2(445.46, 316.93)),
        createCell('k', new Vec2(7,1), new Vec2(508.17, 316.93)),
        createCell('l', new Vec2(8,1), new Vec2(570.88, 316.93)),
        createCell('z', new Vec2(0,2), new Vec2(118.04, 359.06)),
        createCell('x', new Vec2(1,2), new Vec2(184.98, 359.06)),
        createCell('c', new Vec2(2,2), new Vec2(251.91, 359.06)),
        createCell('v', new Vec2(3,2), new Vec2(319.49, 359.06)),
        createCell('b', new Vec2(4,2), new Vec2(387.07, 359.06)),
        createCell('n', new Vec2(5,2), new Vec2(454.01, 359.06)),
        createCell('m', new Vec2(6,2), new Vec2(520.94, 359.06))

    //]).then(([q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m]) => {
    ]).then((cells) => {
        const cellMap = new CellMap(10,3);
        cells.forEach(cell => {
            cellMap.set(cell.name, cell.coordinates, cell);
        })

        return cellMap
    });
}

function createLayer(zIndex, cells){
    //zIndex++;
    return loadImage('/img/Layer' + zIndex + '.png').then(img => {
        const buffer = document.createElement('canvas');
        buffer.width = gameWidth;
        buffer.height = gameHeight;
        buffer.getContext('2d').drawImage(img, 0, 0);

        return new Layer(zIndex, buffer, cells);
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
    return createLayer('4', null).then(layer => {
        return layer;
    });
}

