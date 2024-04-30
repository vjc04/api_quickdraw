
import { Categoria } from "../entity/Categoria.entity";
import { AppDataSource } from "../data-source";

export class CategoriaRepository{
    private repository = AppDataSource.getRepository(Categoria);

   
    async findByNombre(Nombre: string) {
        return this.repository.findOneBy({ Nombre });
    }


    async findById(id_categoria: string) {
        return this.repository.findOneBy({ id_categoria });
    }

    async getAll() {
        return this.repository.find();
    }

    async save(Nombre: Categoria){
        return this.repository.save(Nombre);
    }
   
    async delete (id_categoria: string){
        return this.repository.delete(id_categoria);
    }
}