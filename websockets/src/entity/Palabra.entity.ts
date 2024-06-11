import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
  } from "typeorm";
import { Categoria } from "./Categoria.entity";
  
  @Entity({ name: "palabras" })
  export class Palabra extends BaseEntity {
    @PrimaryGeneratedColumn(("uuid"))
    id: string;
  
    @Column({ nullable: false, type:'varchar' })
    texto: string;

    @ManyToOne(()=> Categoria, (categoria) => categoria.palabras)
    categoria: Categoria;

    @Column({type: 'uuid'})
    categoriaIdCategoria: string;

   
  }