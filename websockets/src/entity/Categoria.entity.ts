import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,

  } from "typeorm";
import { Palabra } from "./Palabra.entity";
import { SalaJuego } from "./SalaJuego.entity";
  
  @Entity({ name: "categorias" })
  export class Categoria extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id_categoria: string;
  
    @Column({ nullable: false, type:'varchar' })
    Nombre: string;

    @OneToMany(()=> Palabra, (palabra) => palabra.categoria)
    palabras: Palabra[];

  
  }