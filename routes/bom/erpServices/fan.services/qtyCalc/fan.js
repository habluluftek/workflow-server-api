var formula = require('../../../template/formula');

module.exports = {
    fan : () => {
        var antiVibrantQty = formula.antiVibrantQty();
        var fan = {
          antiVibrantQty: antiVibrantQty
        }
        return fan
    }
}