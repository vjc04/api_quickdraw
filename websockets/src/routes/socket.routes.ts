import { SongRepository } from "../repositories/song.repository";
import { Room, Player, Game, MAX_PLAYERS, CurrentTurn} from '../index'
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
                    countdown: 0,
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
             room.players.push(new_player)
             
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

            room.players[room.painter_index].ws.send(`tu tienes el turno con la palabra: vaca`);

        }

        
        

        
        /*ws.on('message', async function(msg) {
            const jsonMessage: {type: string, data: any} = JSON.parse(msg);
            if(jsonMessage.type === 'SEND_MESSAGE'){
                if (rooms[roomName]) {
                    rooms[roomName].forEach(client => {
                        if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                          console.log(ws.OPEN);
                            client.ws.send(`${userName} Says: ${jsonMessage.data}`);
                        }
                    });
                }
            }if(jsonMessage.type === 'FINISH_TURN'){
                const songs = await songRepository.getAll();
                if (rooms[roomName]) {
                    rooms[roomName].forEach(client => {
                        if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                          console.log(ws.OPEN);
                            client.ws.send(JSON.stringify(songs));
                        }
                    });
                }
            }
            
        });*/
        /*ws.on('close', function() {
            rooms[roomName].delete(ws);
            if (rooms[roomName].size === 0) {
                delete rooms[roomName];
            }
        });*/
    });

    return router;
};