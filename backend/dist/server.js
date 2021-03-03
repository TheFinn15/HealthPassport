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
const CorsConfigure_1 = require("./middlewares/CorsConfigure");
class HealthPassport extends core_1.Server {
    constructor() {
        super();
        const corsConfig = new CorsConfigure_1.CorsConfigure().config();
        this.app.use(cors_1.default(corsConfig));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((req, resp, next) => {
            console.log(req.statusCode);
        });
        // this.app.use(((req, res, next) => {
        //   console.log(req.statusCode)
        //   console.log(res.statusCode)
        //   if (res.statusCode === 404) {
        //     return res.status(404).send({
        //       status: 404,
        //       error: "NOT FOUND"
        //     });
        //   } else {
        //     if (typeof req.body === "object")
        //       return res.status(res.statusCode).json(req.body);
        //     else
        //       return res.status(res.statusCode).send(req.body);
        //   }
        // }));
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
        this.app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server is running on port ${process.env.SERVER_PORT}...`);
        });
    }
}
exports.HealthPassport = HealthPassport;
//# sourceMappingURL=server.js.map