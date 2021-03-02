"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthPassport = void 0;
const core_1 = require("@overnightjs/core");
const body_parser_1 = __importDefault(require("body-parser"));
const user_controller_1 = require("./controllers/user.controller");
const cors_1 = __importDefault(require("cors"));
const partner_controller_1 = require("./controllers/partner.controller");
const service_controller_1 = require("./controllers/service.controller");
class HealthPassport extends core_1.Server {
    constructor() {
        super();
        const corsOptions = {
            origin: 'http://localhost:8080',
            methods: ['GET', 'PUT', 'POST', 'DELETE'],
            optionsSuccessStatus: 200,
            credentials: true,
            allowedHeaders: [
                'Content-Type', 'Authorization',
                'X-Requested-With', 'device-remember-token',
                'Access-Control-Allow-Origin', 'Origin', 'Accept'
            ]
        };
        this.app.use(cors_1.default(corsOptions));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((req, res) => {
            res.status(404).send({
                status: 404,
                error: "NOT FOUND"
            });
        });
        let userController = new user_controller_1.UserController();
        let partnerController = new partner_controller_1.PartnerController();
        let serviceController = new service_controller_1.ServiceController();
        this.addControllers([
            userController,
            partnerController,
            serviceController
        ]);
    }
    start() {
        this.app.listen(3000, () => {
            console.log('Server is running...');
        });
    }
}
exports.HealthPassport = HealthPassport;
//# sourceMappingURL=server.js.map