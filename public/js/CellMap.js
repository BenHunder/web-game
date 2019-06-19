import { Vec2 } from "./math";

//im sure there are better ways to do this, but this makes sense to me at this moment so, I'm rolling with it.
//cellMap contains a map so you can access cells by their corresponding letter (the key) and it contains a two dimensional array (this.grid) so cells can be accessed by x,y coordinates and math can be done to get neightboring cells

//TODO test and utilize this class
//TODO not sure if it would be useful yet, but all of these functions could accept another argument n which specify how many cells you want to retrieve in that direction. For example right(myCell, 2) would return the cell immediately to the right of myCell and the cell two to the right of myCell. In this case argument overloading would be necessary (https://stackoverflow.com/questions/10855908/how-to-overload-functions-in-javascript/10855939)
export default class CellMap{
    constructor(gridWidth, gridHeight){
        this.letterMap = new Map();
        this.grid = new Array(gridWidth).fill(new Array(gridHeight).fill(null));
    }

    set(key, coordinates, cell){
        this.letterMap.set(key, cell);
        this.grid[coordinates.x][coordinates.y] = cell;
    }

    get(key){
        return letterMap.get(key);
    }

    right(cell){
        const x = cell.coordinates.x + 1;
        const y = cell.coordinates.y;

        return this.grid[x][y];
    }

    left(cell){
        const x = cell.coordinates.x - 1;
        const y = cell.coordinates.y;

        return this.grid[x][y];
    }

    above(cell){
        const x = cell.coordinates.x;
        const y = cell.coordinates.y - 1;

        return this.grid[x][y];
    }

    below(cell){
        const x = cell.coordinates.x;
        const y = cell.coordinates.y + 1;

        return this.grid[x][y];
    }

    upperRight(cell){
        const x = cell.coordinates.x + 1;
        const y = cell.coordinates.y - 1;

        return this.grid[x][y];
    }

    lowerRight(cell){
        const x = cell.coordinates.x + 1;
        const y = cell.coordinates.y + 1;

        return this.grid[x][y];
    }

    upperLeft(cell){
        const x = cell.coordinates.x - 1;
        const y = cell.coordinates.y - 1;

        return this.grid[x][y];
    }

    lowerLeft(cell){
        const x = cell.coordinates.x - 1;
        const y = cell.coordinates.y + 1;

        return this.grid[x][y];
    }

    cross(cell){
        return [
            above(cell),
            left(cell),
            right(cell),
            below(cell),
        ]
    }

    corners(cell){
        return [
            upperLeft(cell),
            upperRight(cell),
            lowerLeft(cell),
            lowerRight(cell),
        ]
    }

    cellsAdjacentTo(cell){
        return [
            upperLeft(cell),
            above(cell),
            upperRight(cell),
            left(cell),
            right(cell),
            lowerLeft(cell),
            below(cell),
            lowerRight(cell),
        ]
    }

    //TODO am i sure this works?
    areAdjacent(cell1, cell2){
        return (cell1.x >= cell2.x - 1) &&
            (cell1.x <= cell2.x + 1) &&
            (cell1.y >= cell2.y - 1) &&
            (cell1.y <= cell2.y + 1)
    }
}