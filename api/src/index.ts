import http from 'http';
import debug from 'debug';
import App from './app';

debug('ts-express:server');

const port = normalizePort(process.env.PORT || 3100);
App.set('port', port);

const server: any = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | boolean {
    const portVar: number = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(portVar)) {
        return val;
    }

    if (portVar >= 0) {
        return portVar;
    }

    return false;
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            debug(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            debug(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
