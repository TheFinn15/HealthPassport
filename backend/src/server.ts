import {Server} from "@overnightjs/core";
import bodyParser from "body-parser";
import {UserController} from "./controllers/user.controller";


export class HealthPassport extends Server {
  constructor() {
    super();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));

    let userController = new UserController();

    this.addControllers([userController]);
  }

  public start() {
    this.app.listen(3000, () => {
      console.log('Server is runnig...');
    })
  }
}