export const multiply = (creature) => ({
    multiply: function multiply(cellMap, cell){
        const pattern = "right";

        const newCell = cellMap[pattern](cell);
        //TODO create cell.spawn function which does nothing or throws an error if the cell is already active,
        if(newCell){
            newCell.setCreature(this.creatureFactory.create());
            newCell.spawn.start();
        }
    }.bind(creature)
})