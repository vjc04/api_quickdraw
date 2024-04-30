import { Request, Response } from "express";
import { CategoriaResponse } from "../dto/categoria.dto";
import { CategoriaRepository } from "../repositories/categoria.repository";
import { Categoria } from "../entity/Categoria.entity";

import { v4 as uuidv4 } from 'uuid';

export class CategoriaController{
    
    private CategoriaRepository: CategoriaRepository = new CategoriaRepository();
    public getByNombre = async (req: Request, res: Response) => {
        try {
            const Nombre = <string>req.query.Nombre;
            console.log(Nombre);
            const palabra: CategoriaResponse = await this.CategoriaRepository.findByNombre(Nombre);
            console.log('response del '+ Nombre);
            return res.status(200).json({
                Nombre,
              });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByIdCategoria = async (req: Request, res: Response) => {
        const {id_categoria} = req.params;
        try {
          
            const categoria: Categoria = await this.CategoriaRepository.findById(id_categoria);
            if(categoria === null){
                res.status(404).json({ error: 'Categoria doesn´t exists'});
            }
            res.status(200).json({categoria});
            console.log(categoria);
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            console.log('estas son las Categorias iniciales');
            const categorias: Categoria[] = await this.CategoriaRepository.getAll();
            console.log('estas son las Categorias'+ categorias);
            return res.status(200).json(categorias);
        } catch (error) {
             res.status(400).json({ error: error.message });
       }
    }

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            
            const id_Categoria = uuidv4();
            body['id_Categoria']= id_Categoria;
            console.log('este es el body2 de la Categoria'+ body)
            const result: Categoria = await this.CategoriaRepository.save(body);
            console.log('este es el response de la Categoria'+ result)
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public update = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const id_Categoria = body.id;
            let categoriaToUpdate: Categoria = await this.CategoriaRepository.findById(id_Categoria);
            categoriaToUpdate = {
                ...body
            } 
            const result: Categoria = await this.CategoriaRepository.save(categoriaToUpdate);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const {id_Categoria} = req.params;
        try {
            await this.CategoriaRepository.delete(id_Categoria);
            res.status(200).json({message: 'Deleted'});
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}