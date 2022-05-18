require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({
    accessToken:'KrFQZMe30g0AAAAAAAAAART-wUayN1z5JZtuHakuoGz6JrXOiUraT2tkuOZ_uFQy',
    
    // accessToken: 'GD95hO9eZBkAAAAAAAAAAYtZ0jRJvNzdOQpzQE6GVCCy1SfzS-UNPiKm38eugrx7',
    fetch
});
module.exports = dbx;