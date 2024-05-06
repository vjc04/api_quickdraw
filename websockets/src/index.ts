import { AppDataSource } from "./data-source";
import * as dotenv from "dotenv";

import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import { myRouter } from "./routes/myRouter.routes";
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerSpec from './swagger'
const cors = require('cors');
dotenv.config();
export const MAX_PLAYERS: number = 3;

export interface Player {
  username: string,
  score: number,
  points_gained: number,
  ws: any
}
export interface Room {
  roomName: string,
  current_round: number,
  painter_index: number,
  players: Player[],
  status: string, 
  current_turn: CurrentTurn
}
export interface CurrentTurn {
  word: string,
  countdown: number,
  guessed: {
    username: string,
    points_gained: number
  }[]
}
export interface Game {
  rooms: Room[]
}



const { PORT = 3000 } = process.env;
var express = require('express');
var app = express();
const wsInstance = require('express-ws')(app);
const websocketRouter = require('../src/routes/socket.routes')(wsInstance);
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use("/api", myRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/ws', websocketRouter);
AppDataSource.initialize()
  .then(async () => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));