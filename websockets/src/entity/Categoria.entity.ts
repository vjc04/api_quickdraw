import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
  } from "typeorm";
  
  @Entity({ name: "Categorias" })
  export class Categoria extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id_categoria: string;
  
    @Column({ nullable: false, type:'varchar' })
    Nombre: string;
  
  }