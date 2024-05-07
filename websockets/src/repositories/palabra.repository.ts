
import { Palabra } from "../entity/Palabra.entity";
import { AppDataSource } from "../data-source";
//import {getRepository} from "typeorm"; 


export class PalabraRepository{
    private repository = AppDataSource.getRepository(Palabra);
    

   
    async findByTexto(texto: string) {
        return this.repository.findOneBy({ texto });
    }


    async findById(id: string) {
        return this.repository.findOneBy({ id });
    }

    async getAll() {
        return this.repository.find();
        
    }

    async save(palabra: Palabra){
        return this.repository.save(palabra);
    }
   
    async delete (id: string){
        return this.repository.delete(id);
    }

   

    
}
//export const randomWord = getRepository(Palabra) .createQueryBuilder("palabra").select().orderBy('RANDOM()').getOne();
/*export const customRepository = AppDataSource.getRepository(Palabra);
export const randomWord = customRepository
          .createQueryBuilder('palabra')
          .select()
          .orderBy('RANDOM()')
          .getOne();*/
    
    //console.log(randomWord);