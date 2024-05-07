import { Request, Response } from "express";
import { PalabraResponse } from "../dto/palabra.dto";
import { PalabraRepository } from "../repositories/palabra.repository";
import { Palabra } from "../entity/Palabra.entity";

import { v4 as uuidv4 } from 'uuid';

export class PalabraController{
    
    private palabraRepository: PalabraRepository = new PalabraRepository();
    public getByTexto = async (req: Request, res: Response) => {
        try {
            const texto = <string>req.query.texto;
            console.log(texto);
            const palabra: PalabraResponse = await this.palabraRepository.findByTexto(texto);
            console.log('response del '+texto);
            return res.status(200).json({
                palabra,
              });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
          
            const palabra: Palabra = await this.palabraRepository.findById(id);
            if(palabra === null){
                res.status(404).json({ error: 'Word doesnt exists'});
            }
            res.status(200).json({palabra});
            console.log(palabra);
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            console.log('estas son las palabras inicio');
            const palabras: Palabra[] = await this.palabraRepository.getAll();
            console.log('estas son las palabras'+ palabras);
            return res.status(200).json(palabras);
        } catch (error) {
             res.status(400).json({ error: error.message });
       }
    }

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            
            const id = uuidv4();
            body['id']= id;
            console.log('este es el body2 de la palabra'+ body)
            const result: Palabra = await this.palabraRepository.save(body);
            console.log('este es el response de la palabra'+ result)
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public update = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const id = body.id;
            let palabraToUpdate: Palabra = await this.palabraRepository.findById(id);
            palabraToUpdate = {
                ...body
            } 
            const result: Palabra = await this.palabraRepository.save(palabraToUpdate);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            await this.palabraRepository.delete(id);
            res.status(200).json({message: 'Deleted'});
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}