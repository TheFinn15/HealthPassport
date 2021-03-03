import {Server} from "@overnightjs/core";
import bodyParser from "body-parser";
import {UserController} from "./controllers/user.controller";
import cors from "cors";
import {PartnerController} from "./controllers/partner.controller";
import {ServiceController} from "./controllers/service.controller";
import {CorsConfigure} from "./middlewares/CorsConfigure";


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

    this.addControllers([
      userController,
      partnerController,
      serviceController
    ]);
  }

  public start() {
    this.app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}...`);
    })
  }
}