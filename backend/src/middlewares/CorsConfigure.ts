
export class CorsConfigure {
  config() {
     return {
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
