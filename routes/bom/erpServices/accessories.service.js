var {dampers} = require('./assessories.services/damper.service');
var {door} = require('./assessories.services/door.service');

module.exports = {
    accessories : (data, accessories, itemMaster, unitQty) => {
        let accessoriesData;
        var damperQty = accessories?.dampers
        let _dampers = []
        if(data.accessoriesForm?.dampers?.length != 0 && data.accessoriesForm?.dampers[0]?.qty !== null){
        _dampers = dampers(data, damperQty, itemMaster, unitQty);
        }
        let _doors = []
        if (data.accessoriesForm?.doors?.length != 0 && data.accessoriesForm?.doors[0]?.qty !== null) {
        _doors = door(data, itemMaster, unitQty);
        }
        accessoriesData = {dampers : _dampers, doors : _doors};
        return accessoriesData;

    }
}