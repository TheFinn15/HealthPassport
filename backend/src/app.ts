import {HealthPassport} from "./server";
import {verify} from "jsonwebtoken";


const server = new HealthPassport()
server.start()

// console.log(typeof verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMywibG9naW4iOiJUaGVGaW5uMiJ9LCJpYXQiOjE2MTQ2MDE4NDMsImV4cCI6MTYxNDY4ODI0M30.949MEMISXYOJ9_loRZKbVRIot4bc5rsR5Cqb9Kv697c', 'T0p_S3cr3t'));