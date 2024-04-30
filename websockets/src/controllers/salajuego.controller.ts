import { Request, Response } from "express";
import { SalaJuegoResponse } from "../dto/salajuego.dto";
import { SalaJuegoRepository } from "../repositories/salajuego.repository";
import { SalaJuego } from "../entity/SalaJuego.entity";

import { v4 as uuidv4 } from 'uuid';

export class SalaJuegoController {
    
    private salaJuegoRepository: SalaJuegoRepository = new SalaJuegoRepository();

    public getByNombre = async (req: Request, res: Response) => {
        try {
            const nombreSala = <string>req.query.nombreSala;
            const sala: SalaJuego = await this.salaJuegoRepository.findByNombre(nombreSala);
            return res.status(200).json({ sala });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByIdSala = async (req: Request, res: Response) => {
        const { idSala } = req.params;
        try {
            const salaJuego: SalaJuego = await this.salaJuegoRepository.findById(idSala);
            if (!salaJuego) {
                return res.status(404).json({ error: 'Sala de juego no encontrada' });
            }
            return res.status(200).json({ salaJuego });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const salasJuego: SalaJuego[] = await this.salaJuegoRepository.getAll();
            return res.status(200).json(salasJuego);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public create = async (req: Request, res: Response) => {
        const { nombreSala, estado } = req.body;
        try {
            const idSala = uuidv4();
            const nuevaSala = {
                idSala,
                nombreSala,
                estado:'SIN INICIAR'
            }; 
            const salaCreada: SalaJuego = await this.salaJuegoRepository.save(nuevaSala);
            return res.status(201).json({ salaJuego: salaCreada });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { nombreSala, estado } = req.body;
        try {
            let salaJuegoToUpdate: SalaJuego = await this.salaJuegoRepository.findById(id);
            if (!salaJuegoToUpdate) {
                return res.status(404).json({ error: 'Sala de juego no encontrada' });
            }
            salaJuegoToUpdate.nombreSala = nombreSala;
            salaJuegoToUpdate.estado = estado;
            const updatedSala: SalaJuego = await this.salaJuegoRepository.save(salaJuegoToUpdate);
            return res.status(200).json({ salaJuego: updatedSala });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await this.salaJuegoRepository.delete(id);
            return res.status(200).json({ message: 'Sala de juego eliminada' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
