/**
 * @file 处理edp-webserver的upload相关功能
 * @author Justineo(justice360@gmail.com)
 */
var mockup = require('./mockup');
var logger = require('./logger');

var upload = {};

upload.getLocation = function () {
    return /^\/data\/.+\/upload$/;
};

upload.getHandlers = function () {
    return function(context, uploadType) {
        context.stop();
        try {
            var request = context.request;
            var handler = mockup.load(request);

            if (handler) {
                var postData = request.bodyBuffer || '';
                var reqBody = postData.toString();
                var fileReg = new RegExp(/name="callback"[\r\n]*([\w\.\[\]'"]+)[\r\n]*[\s\S]+?filename="(.*?)\.([^\.]+?)"[\r\n]*Content\-Type: [a-zA-z\/\.\-]+?[\r\n]*([\s\S]+?)\-{6}/);
                var result = fileReg.exec(reqBody);
                var callback = (result && result[1]) || '';
                var fileName = (result && result[2]) || '';
                var fileType = (result && result[3]) || '';
                var fileData = (result && result[4]) || '';

                var data, res;
                var timeout = handler.timeout;
                if (!fileName || !fileData) {
                    logger.warn('edp', 'UPLOAD', 'Filename or fileData is null');
                    data = handler.response(request.pathname, { success: "false", callback: callback });
                }
                else {
                    logger.ok('edp', 'UPLOAD', 'File ' + fileName + '.' + fileType + 'is saved');

                    res = {
                        url: request.headers.host + '/mockup/tmp/' + fileName + '.' + fileType
                    };
                    data = handler.response(request.pathname, {
                        success: "true",
                        callback: callback,
                        fileName: fileName,
                        fileType: fileType,
                        result: res
                    });
                }

                context.status = 200;
                context.header['Content-Type'] = 'text/html;charset=UTF-8';
                context.content = data;

                if (timeout) {
                    setTimeout(function () {
                        context.start();
                    }, timeout);
                }
                else {
                    context.start();
                }
            }
            else {
                logger.error('edp', 'ERROR', 'Mockup data not found for UPLOAD');
                context.status = 404;
                context.start();
            }
        }
        catch (e) {
            logger.error('edp', 'ERROR', e.toString());
            context.status = 500;
            context.start();
        }
    };
};

module.exports = exports = upload;




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
