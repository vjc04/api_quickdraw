import { Request, Response } from "express";
import { CategoriaResponse } from "../dto/categoria.dto";
import { CategoriaRepository } from "../repositories/categoria.repository";
import { Categoria } from "../entity/Categoria.entity";
import { AppDataSource } from "../data-source";
import { Palabra } from "../entity/Palabra.entity";

import { v4 as uuidv4 } from 'uuid';
import { DataSource } from "typeorm";

export class CategoriaController{
    
    private CategoriaRepository: CategoriaRepository = new CategoriaRepository();
    public getByNombre = async (req: Request, res: Response) => {
        try {
            const Nombre = <string>req.query.Nombre;
            console.log(Nombre);
            const categoria: CategoriaResponse = await this.CategoriaRepository.findByNombre(Nombre);
            console.log('response del '+ Nombre);
            return res.status(200).json({
                categoria,
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
            
        
            const categoriax : Categoria = await this.CategoriaRepository.findByNombre(body.nombre);
            if(categoriax != null){
               
               
                return res.status(404).json({ error: 'Categoria already exists'});
            }

            const categoria = new Categoria();
            categoria.id_categoria = uuidv4();
            categoria.Nombre= body.nombre;
            
            if(body.palabra != null){
                const palabra = new Palabra();
                palabra.id= uuidv4();
                palabra.texto= body.palabra;
                await AppDataSource.manager.save(palabra);
                categoria.palabras= [palabra];
            }

            const result: Categoria = await AppDataSource.manager.save(categoria);
         
            console.log('este es el response de la Categoria'+ result)
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    

    public update = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const id_categoria = body.id;
            let categoriaToUpdate: Categoria = await this.CategoriaRepository.findById(id_categoria);
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
        const {id_categoria} = req.params;
        try {
            await this.CategoriaRepository.delete(id_categoria);
            res.status(200).json({message: 'Deleted'});
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}