import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

class WebSocketServer {
  private io: SocketIOServer;
  private connectedUsers: { [key: string]: string } = {};

  constructor(private server: Server) {
    this.io = new SocketIOServer(this.server);
    this.initializeSocket();
  }

  private initializeSocket(): void {
    this.io.on('connection', (socket: Socket) => {
      const user = socket.handshake.query.user as string;

      if (user) {
        this.connectedUsers[user] = socket.id;
      }

      socket.on('disconnect', () => {
        if (user) {
          delete this.connectedUsers[user];
        }
      });
    });
  }
}

export { WebSocketServer };

// Exemplo de uso:
// import * as http from 'http';
// const server = http.createServer();
// new WebSocketServer(server);
