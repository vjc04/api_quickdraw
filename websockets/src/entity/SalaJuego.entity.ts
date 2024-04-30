
  import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity 
  } from "typeorm";

@Entity({ name: "salas" })
export class SalaJuego extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    idSala: string;

    @Column({ nullable: false, type: 'varchar' })
    nombre: string;

    @Column({ nullable: false, type: 'varchar' })
    estado: string;
}
