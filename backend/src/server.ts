import {Server} from "@overnightjs/core";
import bodyParser from "body-parser";
import {UserController} from "./controllers/user.controller";
import cors from "cors";
import {PartnerController} from "./controllers/partner.controller";
import {ServiceController} from "./controllers/service.controller";
import {CorsConfigure} from "./middlewares/CorsConfigure";
import {TokenController} from "./controllers/token.controller";
import {ResultController} from "./controllers/result.controller";
import {CapabilityController} from "./controllers/capability.controller";


export class HealthPassport extends Server {
  constructor() {
    super();

    const corsConfig = new CorsConfigure().config();

    this.app.use(cors(corsConfig));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));

    let userController = new UserController();
    let partnerController = new PartnerController();
    let serviceController = new ServiceController();
    let tokenController = new TokenController();
    let resultController = new ResultController();
    let capController = new CapabilityController();

    this.addControllers([
      userController,
      partnerController,
      serviceController,
      tokenController,
      resultController,
      capController
    ]);
  }

  public start() {
    this.app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}...`);
    })
  }
}
