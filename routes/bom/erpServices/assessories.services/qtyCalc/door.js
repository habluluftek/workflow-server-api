var formula = require('../../../template/formula');

module.exports = {
    door: (data) => {
        var doorArr = data.accessoriesForm.doors;
        var profileType = data.unitForm.profileType;
        
        var cornerProfileData = cornerProfiles.filter(i => (i.Sub_Group === profileType))[0];
        

        let doors = [];
        doorArr.forEach(e => {
            var doorType = e.type; 
        })
    }
}