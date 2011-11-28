var ReqLog  = require('blaast/mark').RequestLogger;
var Scaling = require('blaast/scaling').Scaling;
var rlog = new ReqLog(app.log);
var scaling = new Scaling(app.config);



app.setResourceHandler(function(request, response) {
    var r = rlog.start(request.id);

    function sendReply(response, error, imageType, data) {
        if (error) {
            r.error(error);
            response.failed();
        } else {
            r.done();
            response.reply(imageType, data);
        }
    }
    
    scaling.scale(request.id, request.display_width, request.display_height, 'image/jpeg',
        function(err, data) {
            sendReply(response, err, 'image/jpeg', data);
        }
    );
});

