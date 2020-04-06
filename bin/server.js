'use strict'

//Importação de módulos no node
const app = require('../src/app');
const debug = require('debug')('nodestr:server');
const http = require('http');

//const port = 3000;
const port = normalizedPort(process.env.port || '3000');
app.set('port',port);

//criar o servidor
const server = http.createServer(app);//criando um modelo MVC


//falando para o servidor ficar ouvindo a porta 3000
server.listen(port);
server.on('error',onError);
server.on('listening',onListening);

console.log("API rodando na porta : " + port);

//Normalizando a porta para escutar
function normalizedPort(val){
    const port = parseInt(val,10);
    if(isNaN(port)){
        return val;
    }
    if(port >=0){
        return port;
    }
    return false;
}

//trativa de erros
function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
  
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
  
      default:
        throw error;
    }
}

// listener handler
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
