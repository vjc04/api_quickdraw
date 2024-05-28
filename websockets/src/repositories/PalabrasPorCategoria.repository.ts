
/*import { PalabrasPorCategoria } from "../entity/PalabrasPorCategoria.entity";
import { AppDataSource } from "../data-source";

export class PalabraPorCategoriaRepository{
    private repository = AppDataSource.getRepository(PalabrasPorCategoria);

   
    async findByIdPalabra(idPalabra: string) {
        return this.repository.findOneBy({ idPalabra });
    }


    async findByIdCategoria(idCategoria: string) {
        return this.repository.findOneBy({ idCategoria });
    }

    async getAll() {
        return this.repository.find();
    }

    async save(palabraporcategoria: PalabrasPorCategoria){
        return this.repository.save(PalabrasPorCategoria);
    }
   
    async delete (idPalabra: string){
        return this.repository.delete(idPalabra);
    }
}*/