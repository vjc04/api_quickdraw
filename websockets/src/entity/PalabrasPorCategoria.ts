import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
  } from "typeorm";
  
  @Entity({ name: "palabraporcategoria" })
  export class PalabraPorCategoria extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    idPalabra: string;
  
    @Column({ nullable: false, type:'varchar' })
    idCategoria: string;
  
  }