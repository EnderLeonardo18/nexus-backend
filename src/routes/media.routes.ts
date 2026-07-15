import { Router } from "express";
import { MediaController } from "../controllers/media.controller.js";
import { searchLoggerMiddleware } from "../middlewares/search-logger.middleware.js";

const router = Router();
const mediaController = new MediaController();

// Ruta para obtener todo el catálogo (Ideal para pruebas en Insomnia)
router.get('/all', mediaController.getAll);

// Definimos el endpoint GET para buscar peliculas
router.get('/search', searchLoggerMiddleware, mediaController.search);

export default router;