"use strict";
var UtilsService = (function () {
    function UtilsService() {
    }
    UtilsService.getClassName = function (isActive, baseName, activeName, inactiveName) {
        var className = baseName;
        if (isActive) {
            className += ' ' + activeName;
        }
        else {
            if (inactiveName) {
                className += ' ' + inactiveName;
            }
        }
        return className;
    };
    return UtilsService;
}());
exports.UtilsService = UtilsService;
