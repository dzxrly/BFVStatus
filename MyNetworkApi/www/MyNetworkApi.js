cordova.define("cordova-plugin-simplenetworkapi.MyNetworkApi", function(require, exports, module) {
    var exec = require('cordova/exec');
    
    // exports.coolMethod = function (arg0, success, error) {
    //     exec(success, error, 'MyNetworkApi', 'coolMethod', [arg0]);
    // };
    var networkFrontApi = function(){}
    
    networkFrontApi.prototype.getDataByUrl = function(arg0,success,error) {
        exec(success,error,"NetworkFrontApi","GetDataByURL",arg0);
    };
    
    var NWFAPI = new networkFrontApi();
    module.exports = NWFAPI;
    });