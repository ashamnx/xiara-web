"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@xiara/core");
var HTTPException = /** @class */ (function (_super) {
    __extends(HTTPException, _super);
    function HTTPException(response, statusCode) {
        var _this = _super.call(this) || this;
        _this.response = response;
        _this.statusCode = statusCode;
        return _this;
    }
    return HTTPException;
}(core_1.XiaraException));
exports.HTTPException = HTTPException;
;

//# sourceMappingURL=HTTPException.js.map
