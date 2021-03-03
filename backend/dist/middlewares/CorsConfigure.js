"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsConfigure = void 0;
class CorsConfigure {
    config() {
        return {
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
    }
}
exports.CorsConfigure = CorsConfigure;
//# sourceMappingURL=CorsConfigure.js.map