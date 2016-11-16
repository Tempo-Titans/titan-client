var express = require('express');
var app = module.exports.app = exports.app = express();

app.start = function() {
    app.listen(process.env.PORT || 8080, function () {
        //var port = server.address().port;
        console.log("App now running...");
    });
};