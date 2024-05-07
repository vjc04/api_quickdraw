import { SongRepository } from "../repositories/song.repository";
import { Room, Player, Game, MAX_PLAYERS, CurrentTurn, MAX_ROUNDS} from '../index'
const express = require('express');
const router = express.Router();
module.exports = (expressWs) => {
    
    const songRepository = new SongRepository();
    expressWs.applyTo(router);

    //create game
    let game: Game = {
        rooms: []};
    let rooms = game.rooms;
    //const rooms = {};

    router.ws('/room/:roomName', (ws, req) => {
        const roomName = req.params.roomName;
        const userName = req.headers.username;
        const existRoom = rooms.find((room) => room.roomName === roomName);
        if (!existRoom) {
            let room: Room = {
                roomName: roomName,
                current_round: 1,
                painter_index: 0,
                players: [
                    {
                      username: userName,
                      score: 0,
                      points_gained: 0,
                      ws: ws
                    }
                  ],
                current_turn: {
                    word: "",
                    countdown: 10,
                    guessed: []
                  },
                status: "not initialized"
             };
             
            rooms.push(room);
            //rooms[roomName] = new Set();
        }
    
        let room = rooms.find(room => room.roomName === roomName);
      
        //Add username
    
        rooms.forEach(room => {
        console.log('sala: '+ room.roomName)}
        );
        let players = room.players;
        console.log('numero jugadores: '+ players.length)
        
        //Check players max number
        if (room.players.length >= MAX_PLAYERS ) {
          ws.send(`${userName} hemos superado el numero de jugadores, por favor intenta con otra sala`);
          ws.close();
          return;
        }

        players.forEach(player=>{
            console.log('jugador: '+ player.username)
        })
        const existPlayer = players.find((player) => player.username === userName);
       
        
        if (!existPlayer){
             let new_player: Player = {
                username: userName,
                score: 0,
                points_gained: 0,
                ws: ws
             };
             room.players.push(new_player);
             
             players.forEach(player=>{
                console.log('jugador agregado: '+ player.username)
                console.log('jugador agregado ws: '+ ws)
            });

            //Notificar a todos que me uní
            if (room.players.length > 1 ) {
                room.players.forEach(client => {
                if (client.ws != ws && client.ws.readyState === ws.OPEN) {
                  console.log(ws.OPEN);
                    client.ws.send(`${userName} has joined`);
                }
            })}; 
        }

        //START GAME
        if (room.players.length == MAX_PLAYERS){
            room.status = "playing";
            room.current_round = 1;
            
            room.players.forEach(client => {
                client.ws.send(`ha comenzado el juego y el primer turno es para: `+ room.players[room.painter_index].username);

            });
            //La palabra se debe traer de la base de datos
            room.current_turn.word = 'vaca';

            room.players[room.painter_index].ws.send(`tu tienes el turno con la palabra: `+ room.current_turn.word);

            

        }

        
        

        
        ws.on('message', async function(msg) {

            const jsonMessage: {type: string, data: any} = JSON.parse(msg);
            let room = rooms.find(room => room.roomName === roomName);
            if(jsonMessage.type === 'SEND_MESSAGE'){
                if (room.players.length > 1 ) {
                room.players.forEach(client => {
                    if (client.ws != ws && client.ws.readyState === ws.OPEN) {
                      console.log(ws.OPEN);
                      client.ws.send(` mensaje enviado por ${userName}: ${jsonMessage.data}`);
                 }
               })
              }
            }; 

            // Validate received word
            if(jsonMessage.type === 'SEND_WORD'){
                if( room.current_turn.word == jsonMessage.data ){
                    //Check if guesser not exist
                    let guessers = room.current_turn.guessed;
                    const existGuesser = guessers.find((guesser) => guesser.username === userName);
                    if (!existGuesser){

                        // Calculate guesser number
                        let guessedNum = room.current_turn.guessed.length;
                        // Create new guessed and calculate points
                        let guessed = {
                            username: userName,
                            points_gained: room.current_turn.countdown-2*guessedNum
                        }; 
                     // Add new guesser to current turn 
                     room.current_turn.guessed.push(guessed);
                     let currentGuessed = guessers.find((guesser) => guesser.username === userName);

                     // Get current player to update your score
                     let currentPlayer = players.find((player) => player.username === userName);
                     let currentScore = currentPlayer.score + currentGuessed.points_gained;
                     currentPlayer.score = currentScore;

                     //Send message to player with accumulated score
                     ws.send(`${userName} tu puntuacion es : ${currentGuessed.points_gained} y tu acumulado es ${currentPlayer.score} `);
                     
                    }
                    
                    // Assign the next turn
                    if (guessers.length >= MAX_PLAYERS-1){
                        console.log('comienza el siguiente turno');
                    

                        //RESET  TURN VALUES
                        //Get word from database
                        room.painter_index = room.painter_index + 1;
                        
                        if(room.painter_index <= MAX_PLAYERS-1){

                            
                            room.current_turn.word = 'vaca';
                            //console.log('el turno es: '+  room.painter_index);

                            //Send turn to next player
                            room.players[room.painter_index].ws.send(`tu tienes el turno con la palabra: `+ room.current_turn.word);
                            room.current_turn.countdown = 10;
                            room.current_turn.guessed = [];
                        }

                        
                    }

                    if(room.painter_index >= MAX_PLAYERS && room.current_round < MAX_ROUNDS){

                        //Update next round
                        room.current_round = room.current_round + 1;
                        //Reset next turn
                        room.painter_index = 0;
                        //Get word from database
                        room.current_turn.word = 'vaca';
                        //Reset countdown
                        room.current_turn.countdown = 10;
                        //Delete guessed array
                        room.current_turn.guessed = [];


                        //Notify to players that next round started

                        if (room.players.length > 1 ) {
                            room.players.forEach(client => {
                                if (client.ws != ws && client.ws.readyState === ws.OPEN) {
                                  console.log(ws.OPEN);
                                  client.ws.send(` Comienza la ronda: ` + room.current_round);
                             }
                           })
                        }

                        //Send turn 
                        room.players[room.painter_index].ws.send(`tu tienes el turno con la palabra--: `+ room.current_turn.word)

                    }
                    //console.log('la ronda es: '+ room.current_round);
                
                    if(room.current_round >= MAX_ROUNDS && room.painter_index >= MAX_PLAYERS){
                        if (room.players.length > 0 ) {
                            room.players.forEach(client => {
                                if (client.ws != ws && client.ws.readyState === ws.OPEN) {
                                  console.log(client.username);
                                  client.ws.send(` El juego ha terminado `);
                             }
                           })
                        }
                    }

                }
                //Send message 
                if (room.players.length > 1 ) {
                room.players.forEach(client => {
                    if (client.ws != ws && client.ws.readyState === ws.OPEN) {
                      console.log(ws.OPEN);
                      client.ws.send(` mensaje enviado por ${userName}: ${jsonMessage.data}`);
                 }
               })
              }
            }; 





            /*if(jsonMessage.type === 'FINISH_TURN'){
                const songs = await songRepository.getAll();
                if (rooms[roomName]) {
                    rooms[roomName].forEach(client => {
                        if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                          console.log(ws.OPEN);
                            client.ws.send(JSON.stringify(songs));
                        }
                    });
                }
            }*/
            
        });
        /*ws.on('close', function() {
            rooms[roomName].delete(ws);
            if (rooms[roomName].size === 0) {
                delete rooms[roomName];
            }
        });*/
    });

    return router;
};