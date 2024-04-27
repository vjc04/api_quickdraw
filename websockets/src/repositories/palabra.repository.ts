
import { Palabra } from "../entity/Palabra.entity";
import { AppDataSource } from "../data-source";

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