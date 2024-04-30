import { SalaJuego } from "../entity/SalaJuego.entity";
import { AppDataSource } from "../data-source";

export class SalaJuegoRepository {
    private repository = AppDataSource.getRepository(SalaJuego);

    async findByNombre(nombre: string) {
        return this.repository.findOne({ where: { nombre } });
    }

    async findById(id: string) {
        return this.repository.findOne({ where: { idSala: id } });
    }

    async getAll() {
        return this.repository.find({where: {estado:"SIN INICIAR"}});
    }

    async save(sala: SalaJuego) {
        return this.repository.save(sala);
    }

    async delete(id: string) {
        return this.repository.delete(id);
    }
}
