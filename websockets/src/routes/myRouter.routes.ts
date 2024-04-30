
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
  "/categoria",
  categoriaController.getByNombre
);

Router.get(
  "/categoria/:id_categoria",
  categoriaController.getByIdCategoria
);

Router.get(
  "/categorias",
  categoriaController.getAll
);

Router.post(
  "/categoria",
  categoriaController.save
);

Router.put(
  "/categoria",
  categoriaController.update
)

Router.delete(
  "/categoria/:id_categoria",
  categoriaController.delete
)

//----------------------

//Sala Juego
Router.get(
  "/salajuego",
  salajuegoController.getByNombre
);

Router.get(
  "/salajuego/:idSala",
  salajuegoController.getByIdSala
);

Router.get(
  "/salasjuego",
  salajuegoController.getAll
);

Router.post(
  "/salajuego",
  salajuegoController.create
);
Router.put(
  "/salajuego",
  salajuegoController.update
);


Router.delete(
  "/salajuego/:idSala",
  salajuegoController.delete
)
  
  export { Router as myRouter };

