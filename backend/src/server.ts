import {Server} from "@overnightjs/core";
import bodyParser from "body-parser";
import {UserController} from "./controllers/user.controller";
import cors, {CorsOptions} from "cors";
import {PartnerController} from "./controllers/partner.controller";
import {ServiceController} from "./controllers/service.controller";


export class HealthPassport extends Server {
  constructor() {
    super();

    this.app.use(((req, res) => {
      res.setHeader("Content-Security-Policy",
        "default-src 'self'; " +
        "font-src 'self'; " +
        "img-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self'; " +
        "frame-src 'self'"
      );
    }));

    const corsOptions: CorsOptions = {
      origin: 'http://localhost:8080',
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      optionsSuccessStatus: 200,
      credentials: true,
      allowedHeaders: [
        'Content-Type', 'Authorization',
        'X-Requested-With', 'device-remember-token',
        'Access-Control-Allow-Origin', 'Origin', 'Accept'
      ]
    }
    this.app.use(cors(corsOptions));
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
    this.app.listen(3000, () => {
      console.log('Server is runnig...');
    })
  }
}