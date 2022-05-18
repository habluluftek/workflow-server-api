var formula = require('../../../template/formula');
module.exports = {
    damper: (data) => {
        var damperArr = data.accessoriesForm.dampers
            let dampers = [];
            damperArr.forEach(e => {
              var dh = e.height;
              var dw = e.width;
              var dQty = e.qty;
            var bladeProfile = formula.bladeProfile(dh,dw,dQty);
            var endProfile = formula.endProfile(dw,dQty);
            var verticalProfile = formula.verticalProfile(dh,dQty);
            var H_Bush = formula.hBush(dh, dQty);
            var bladeGasket = bladeProfile + endProfile;
            var Gear = H_Bush * 0.5;
            var handle = dQty;
            var handlePlate = dQty;
            var leftPlate = H_Bush * 0.5;
            var rightPlate = H_Bush * 0.5;
            var roundBush = H_Bush * 0.5;
            var stopperStick = formula.stopperStick(dQty);
            var wingNut = dQty;
            var screw = formula.screws(dQty);
            var damperData = {
              bladeProfile,
              endProfile,
              verticalProfile,
              H_Bush,
              bladeGasket,
              Gear,
              handle,
              handlePlate,
              leftPlate,
              rightPlate,
              roundBush,
              stopperStick,
              wingNut,
              screw
            }
            dampers.push(damperData);
            })

            var accessories = {dampers : dampers}
            return accessories
    }
}