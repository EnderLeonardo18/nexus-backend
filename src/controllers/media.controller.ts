import type { Request, Response } from "express";
import { MediaService } from "../services/media.service.js";

export class MediaController {
    private mediaService: MediaService;

    constructor() {
        this.mediaService = new MediaService();
    }

    search = async (req: Request, res: Response): Promise<void> => {
        try {
            const query = req.query.q as string;

            if(!query) {
                res.status(400).json({
                    error: 'Falta el parámetro de búsqueda "q'
                })
                return;
            }
            const media = await this.mediaService.searchMovie(query);

            // Validamos si no se encontró nada (array vacío o nulo) de forma segura
            if(!media || media.length === 0){
                res.status(200).json([]) // Retornamos un 200 con array vacío para que el frontend no se rompa
                return
            }
            res.status(200).json(media);

        } catch (error: any) {
            res.status(500).json({
                error: error.message || 'Error interno del servidor'
            })
        }
    }



    /**
     * Endpoint para obtener todo el catálogo de películas
     */
    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const media = await this.mediaService.getAllMovies();
            res.status(200).json(media);
        } catch (error: any) {
            res.status(500).json({
                error: error.message || 'Error interno al obtener todo el catálogo'
            });
        }
    }

}