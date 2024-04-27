"use strict";
exports.__esModule = true;
exports.errorHandler = void 0;
var errorHandler = function (error, req, res, next) {
    console.error("Error: ".concat(error.message));
    return res.status(500).json({ message: "Internal server error" });
};
exports.errorHandler = errorHandler;
