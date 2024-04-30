
import * as express from "express";
import { SongController } from "../controllers/song.controller";
import { PalabraController } from "../controllers/palabra.controller";
import { CategoriaController } from "../controllers/categoria.controller";
import { SalaJuegoController } from "../controllers/salajuego.controller";
const Router = express.Router();
const songController = new SongController();
const palabraController = new PalabraController();
const categoriaController = new CategoriaController();
const salajuegoController = new SalaJuegoController();
Router.get(
    "/song",
    songController.getByTitle
  );

  Router.get(
    "/song/:id",
    songController.getById
  );

  Router.get(
    "/songs",
    songController.getAll
  );

  Router.post(
    "/song",
    songController.save
  );

  Router.put(
    "/song",
    songController.update
  )

  Router.delete(
    "/song/:id",
    songController.delete

    )
  
  
    //-------------------------


  
  Router.get(
    "/palabra",
    palabraController.getByTexto
  );

  Router.get(
    "/palabra/:id",
    palabraController.getById
  );

  Router.get(
    "/palabras",
    palabraController.getAll
  );

  Router.post(
    "/palabra",
    palabraController.save
  );

  Router.put(
    "/palabra",
    palabraController.update
  )

  Router.delete(
    "/palabra/:id",
    palabraController.delete
  )


//  -----------------------------------------

Router.get(
  "/Categoria",
  categoriaController.getByNombre
);

Router.get(
  "/Categoria/:id_Categoria",
  categoriaController.getByIdCategoria
);

Router.get(
  "/Categorias",
  categoriaController.getAll
);

Router.post(
  "/Categoria",
  categoriaController.save
);

Router.put(
  "/Categoria",
  categoriaController.update
)

Router.delete(
  "/Categoria/:id_Categoria",
  categoriaController.delete
)

//----------------------

//Sala Juego
Router.get(
  "/SalaJuego",
  salajuegoController.getByNombre
);

Router.get(
  "/SalaJuego/:idSala",
  salajuegoController.getByIdSala
);

Router.get(
  "/SalasJuego",
  salajuegoController.getAll
);

Router.post(
  "/SalaJuego",
  salajuegoController.create
);
Router.put(
  "/SalaJuego",
  salajuegoController.update
);


Router.delete(
  "/SalaJuego/:idSala",
  salajuegoController.delete
)
  
  export { Router as myRouter };

