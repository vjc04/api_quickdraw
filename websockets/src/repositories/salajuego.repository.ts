import { SalaJuego } from "../entity/SalaJuego.entity";
import { AppDataSource } from "../data-source";

export class SalaJuegoRepository {
    private repository = AppDataSource.getRepository(SalaJuego);

    async findByNombre(nombreSala: string) {
        return this.repository.findOne({ where: { nombreSala } });
    }

    async findById(idSala: string) {
        return this.repository.findOneBy({idSala});
    }

    async getAll() {
        return this.repository.find({where: {estado:"SIN INICIAR"}});
    }

    async save(sala) {
        return this.repository.save(sala);
    }

   async delete(idSala: string) {
        return this.repository.delete(idSala);
    }
}
