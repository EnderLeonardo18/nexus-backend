import { prisma } from '../config/prisma.js';
import type { MediaContent, MediaPlatform, Platform } from '@prisma/client';

export interface CompleteMediaRecord extends MediaContent {
  platforms: (MediaPlatform & {
    platform: Platform;
  })[];
  alternatives: { id: number }[];
}

export class MediaRepository {
  /**
   * Busca producciones por título (tolerante a fallos, case-insensitive)
   * o resuelve por ID numérico exacto solo si el ID existe en la base de datos.
   */
  async searchByTitle(query: string): Promise<CompleteMediaRecord[]> {
    const cleanQuery = query.trim();

    // 1. INTENTO DE BÚSQUEDA POR ID (Exclusivo para cargar las alternativas del carrusel)
    const queryAsId = parseInt(cleanQuery, 10);
    if (!isNaN(queryAsId) && /^\d+$/.test(cleanQuery)) {
      const recordById = await prisma.mediaContent.findUnique({
        where: { id: queryAsId },
        include: {
          platforms: {
            include: { platform: true },
          },
          alternatives: {
            select: { id: true },
          },
        },
      });

      // Si existe un registro real con ese ID, lo retornamos inmediatamente
      if (recordById) {
        return [recordById as CompleteMediaRecord];
      }
    }

    // 2. BÚSQUEDA FLEXIBLE POR TÍTULO (Para la barra de búsqueda)
    // En MySQL, 'contains' es por defecto insensible a mayúsculas/minúsculas (case-insensitive)
    const records = await prisma.mediaContent.findMany({
      where: {
        title: {
          contains: cleanQuery,
        },
      },
      include: {
        platforms: {
          include: {
            platform: true,
          },
        },
        alternatives: {
          select: {
            id: true,
          },
        },
      },
    });

    return records as CompleteMediaRecord[];
  }











  /**
   * Trae todas las películas de la base de datos junto con sus plataformas y alternativas
   */
  async getAllWithRelations(): Promise<CompleteMediaRecord[]> {
    const records = await prisma.mediaContent.findMany({
      include: {
        platforms: {
          include: {
            platform: true,
          },
        },
        alternatives: {
          select: {
            id: true,
          },
        },
      },
    });
    return records as CompleteMediaRecord[];
  }
}