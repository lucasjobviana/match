import { App } from './app'; 
 
const PORT = process.env.APP_PORT || 3001;

new App().start(PORT);
// import express, {  NextFunction } from 'express';
// import cors from 'cors';


// import { Router, Request, Response } from 'express';
// require('express-async-errors')

// const app = express()

// const route = Router()

// app.use(express.json())
// app.use(cors())

// route.get('/', (req: Request, res: Response) => {
//   // throw new Error("deu ruiim aqui");
//   res.json({ message: 'Wow! It is my first project in TypeScript!@' })
// })

// app.use(route)

// const PORT = 3030

// app.use((error: Error, _req:Request, res: Response, _next:NextFunction) => {
//   console.log(error);
//   console.log(error.message)
//   return res.status(500).json({message:error.message});
// })

// app.listen(PORT, () => `Server running on port ${PORT}`)