import { MediaRepository } from '../repositories/media.repository.js';
import type { CompleteMediaRecord } from '../repositories/media.repository.js';
import type { MediaContentDTO } from '../models/media.model.js';

export class MediaService {
  private mediaRepository: MediaRepository;

  constructor() {
    this.mediaRepository = new MediaRepository();
  }

  /**
   * Ejecuta la búsqueda de contenido y transforma la entidad relacional en un DTO limpio para el Frontend
   */
  async searchMovie(query: string): Promise<MediaContentDTO[]> {
    if (!query || query.trim() === '') {
      throw new Error('El término de búsqueda no puede estar vacío.');
    }

    const dbRecords: CompleteMediaRecord[] = await this.mediaRepository.searchByTitle(query.trim());

    return dbRecords.map((record: CompleteMediaRecord): MediaContentDTO => {
      return {
        id: record.id,
        title: record.title,
        type: record.type,
        year: record.year,
        duration: record.duration,
        // Transforma la cadena "Aventura, Ciencia ficción" en un array de strings limpio
        genres: record.genres.split(',').map((g: string) => g.trim()),
        synopsis: record.synopsis,

        // Si existe un path en la BD, le concatenamos la URL base de TMDb que encontraste
        imageUrl: record.imageUrl ? `https://image.tmdb.org/t/p/w600_and_h900_face${record.imageUrl}` : null,
        // Mapea la estructura intermedia de la tabla intermedia a objetos legibles
        availablePlatforms: record.platforms.map((mp) => ({
          name: mp.platform.name,
          logoLetters: mp.platform.logoLetters,
          directLink: mp.directLink,
          requiresSubscription: mp.platform.requiresSubscription,
        })),
        // Extrae directamente los IDs numéricos puros de las alternativas sugeridas
        alternatives: record.alternatives.map((alt) => alt.id),
      };
    });
  }














  /**
   * Retorna todo el catálogo de películas formateado como DTO limpio
   */
  async getAllMovies(): Promise<MediaContentDTO[]> {
    const dbRecords = await this.mediaRepository.getAllWithRelations();

    return dbRecords.map((record: CompleteMediaRecord): MediaContentDTO => {
      return {
        id: record.id,
        title: record.title,
        type: record.type,
        year: record.year,
        duration: record.duration,
        genres: record.genres.split(',').map((g: string) => g.trim()),
        synopsis: record.synopsis,

        // Si existe un path en la BD, le concatenamos la URL base de TMDb que encontraste
        imageUrl: record.imageUrl ? `https://image.tmdb.org/t/p/w600_and_h900_face${record.imageUrl}` : null,
        availablePlatforms: record.platforms.map((mp) => ({
          name: mp.platform.name,
          logoLetters: mp.platform.logoLetters,
          directLink: mp.directLink,
          requiresSubscription: mp.platform.requiresSubscription,
        })),
        alternatives: record.alternatives.map((alt) => alt.id),
      };
    });
  }
}