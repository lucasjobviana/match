import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { createServer, Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';
import userRouter from './route/user.routes';
import loginRouter from './route/login.routes';
import AppResponseError from './AppResponseError';
import SequelizeImageBlobModel from './database/models/SequelizeImageBlobModel';

class App {
  public app: express.Express;
  private server: Server;
  private io: SocketIOServer;
  private connectedUsers: { [key: string]: string } = {};

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: "*", // Ajuste conforme necessário
        methods: ["GET", "POST"], 
      }
    });   

this.app.get('/images/:id', async (req: Request, res: Response) => {
  console.log('_______________------------------_______________-------')
  try {
      const image = await SequelizeImageBlobModel.findByPk(req.params.id);
      if (!image) {
          return res.status(404).send('Image not found.');
      }

      res.setHeader('Content-Type', 'image/png'); // Ajuste o tipo de conteúdo conforme necessário
      res.send(image.fileData);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

    this.app.use((request, response, next) => {
    request.io = this.io;
    request.connectedUsers = this.connectedUsers;
  
    // Segue o fluxo das rotas normalmente
    return next();
  });
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    // this.app.use(this.io);

    this.routes();
    this.config();

    // Inicializa o Socket.IO após configurar as rotas e middlewares
    this.initializeSocket();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: 'Hello World!!' }));

    this.app.use((err: AppResponseError | Error, _req: Request, res: Response, _n: NextFunction) => {
      console.log('Middleware de erro');
      console.log(err);
      console.log('_____________');
      if (err instanceof AppResponseError) {
        return res.status(err.statusCode).json({ from: 'AppResponseError', message: err.message });
      }

      return res.status(500).json({ from: 'GenericError', message: 'Erro não tratado.', messageError: err.message });
    });
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use('/users', userRouter);
    this.app.use('/login', loginRouter);
  }

  private initializeSocket(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('A client connected');
      const user = socket.handshake.query.user as string;
      if (user) {
        this.connectedUsers[user] = socket.id;
        console.log(`User connected: ${user}, socket id: ${socket.id}`);
      } else {
        console.log('No user information provided');
      }

      socket.on('disconnect', () => {
        if (user) {
          console.log(`User disconnected: ${user}`);
          delete this.connectedUsers[user];
        } else {
          console.log('A user disconnected without providing user information');
        }
      });
      console.log('All users connected: ',this.connectedUsers)
    });
  }

  public start(PORT: string | number): void {
    this.server.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// export by test
export const { app } = new App();
