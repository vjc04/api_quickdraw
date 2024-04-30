
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
    nombreSala: string;

    @Column({ nullable: false, type: 'varchar' })
    estado: string;
}
