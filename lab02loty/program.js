"use strict";
exports.__esModule = true;
function fibonacci(e) {
    if (e < 2)
        return e;
    else
        return fibonacci(e - 1) + fibonacci(e - 2);
}
exports.fibonacci = fibonacci;
