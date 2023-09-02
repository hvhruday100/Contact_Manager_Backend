const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statuscode ? res.statuscode : 500;
    switch (statuscode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorised error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "restricted error",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.NOT_FOUND:
            res.json({
                title: "Not found",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.SERVER_ERROR:
            res.json({
                title: "server Failed",
                message: err.message,
                stackTrace: err.stack,
            });

        defalut : 
        console.log("No error found!!All good");
            break;

    }
}
module.exports = errorHandler; 
