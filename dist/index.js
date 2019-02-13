"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function monitor(req, res, next) {
    var start = new Date;
    res.on('finish', function () {
        var duration = Math.abs(new Date().getTime() - start.getTime());
        ;
        var typeOfRequest = req.method;
        var statusOfRequest = res.statusCode;
        var message = res.statusMessage;
        console.log(duration, typeOfRequest, statusOfRequest, message);
    });
    next();
}
exports.monitor = monitor;
;
module.exports = {
    monitor: monitor
};
