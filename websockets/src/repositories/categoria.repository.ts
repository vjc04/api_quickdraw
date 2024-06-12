
import { Categoria } from "../entity/Categoria.entity";
import { AppDataSource } from "../data-source";

export class CategoriaRepository{
   
    private repository = AppDataSource.getRepository(Categoria);

   
    async findByNombre(Nombre: string) {
        return this.repository.findOneBy({ Nombre });
    }

    async getPalabra(Nombre: string) {
        
            const categorias = await this.repository.find({
            where: {Nombre: Nombre},
            relations: {
            palabras: true,}
            
              });

              const keys = JSON.stringify(categorias);

              const keysArray = JSON.parse(keys);
              const palabra = keysArray[(Math.floor(Math.random() * keysArray.length))].palabras[0].texto;

              //console.log('esta es una categoriaaaaa '+ keysArray);
              //console.log(keysArray[(Math.floor(Math.random() * keysArray.length))].palabras[0].texto);
             

            return palabra;

    }




    async findById(id_categoria: string) {
        return this.repository.findOneBy({ id_categoria });
    }

    async getAll() {
        return this.repository.find();
    }

    async save(categoria: Categoria){
        return this.repository.save(categoria);
    }
   
    async delete (id_categoria: string){
        return this.repository.delete(id_categoria);
    }
}