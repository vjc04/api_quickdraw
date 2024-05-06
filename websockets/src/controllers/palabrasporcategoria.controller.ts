import { Request, Response } from "express";
import { PalabrasPorCategoriaResponse } from "../dto/palabrasporcategoria.dto";
import { PalabraPorCategoriaRepository } from "../repositories/PalabrasPorCategoria.repository";
import { PalabrasPorCategoria } from "../entity/PalabrasPorCategoria.entity";

import { v4 as uuidv4 } from 'uuid';

export class PalabraPorCategoriaController{
    
    private PalabrasPorCategoriaRepository: PalabraPorCategoriaRepository = new PalabraPorCategoriaRepository();
    public getByidPalabra = async (req: Request, res: Response) => {
        try {
            const idPalabra = <string>req.query.idPalabra;
            console.log(idPalabra);
            const categoria: PalabrasPorCategoriaResponse = await this.PalabrasPorCategoriaRepository.findByIdPalabra(idPalabra);
            console.log('response del '+ idPalabra);
            return res.status(200).json({
                categoria,
              });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByIdCategoria = async (req: Request, res: Response) => {
        const {idCategoria} = req.params;
        try {
          
            const PalabrasPorCategoria: PalabrasPorCategoria = await this.PalabrasPorCategoriaRepository.findByIdCategoria(idCategoria);
            if(idCategoria === null){
                res.status(404).json({ error: 'Categoria doesn´t exists'});
            }
            res.status(200).json({idCategoria});
            console.log(idCategoria);
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            console.log('estas son las Categorias iniciales');
            const palabrasporcategoria: PalabrasPorCategoria[] = await this.PalabrasPorCategoriaRepository.getAll();
            console.log('estas son las Categorias'+ palabrasporcategoria);
            return res.status(200).json(palabrasporcategoria);
        } catch (error) {
             res.status(400).json({ error: error.message });
       }
    }

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            
            const idPalabra = uuidv4();
            body['idPalabra']= idPalabra;
            console.log('este es el body3 de la palabrasporcategoria'+ body)
            const result: PalabrasPorCategoria = await this.PalabrasPorCategoriaRepository.save(body);
            console.log('este es el response de la palabrasporcategoria'+ result)
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public update = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const idPalabra = body.id;
            let categoriaToUpdate: PalabrasPorCategoria = await this.PalabrasPorCategoriaRepository.findByIdPalabra(idPalabra);
            categoriaToUpdate = {
                ...body
            } 
            const result: PalabrasPorCategoria = await this.PalabrasPorCategoriaRepository.save(categoriaToUpdate);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const {idPalabra} = req.params;
        try {
            await this.PalabrasPorCategoriaRepository.delete(idPalabra);
            res.status(200).json({message: 'Deleted'});
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}