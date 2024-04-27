import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
  } from "typeorm";
  
  @Entity({ name: "songs" })
  export class Song extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ nullable: false, type:'varchar' })
    title: string;
  
    @Column({ nullable: false, type:'varchar'})
    artist: string;
  
    @Column({ nullable: false, type:'varchar'})
    album: string;
  
    @Column({  type: 'int4'})
    year: number;
    
    @Column({ nullable: false, type:'varchar' })
    genre: string;
     
    @Column({ type: 'interval' })
    duration: string;
  

  
  }