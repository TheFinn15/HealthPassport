"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthPassport = void 0;
const core_1 = require("@overnightjs/core");
const body_parser_1 = __importDefault(require("body-parser"));
const user_controller_1 = require("./controllers/user.controller");
class HealthPassport extends core_1.Server {
    constructor() {
        super();
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        let userController = new user_controller_1.UserController();
        this.addControllers([userController]);
    }
    start() {
        this.app.listen(3000, () => {
            console.log('Server is runnig...');
        });
    }
}
exports.HealthPassport = HealthPassport;
//# sourceMappingURL=server.js.map