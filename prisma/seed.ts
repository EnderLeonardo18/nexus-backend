import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Limpiando base de datos anterior...');
  await prisma.mediaPlatform.deleteMany({});
  await prisma.platform.deleteMany({});
  await prisma.mediaContent.deleteMany({});

  console.log('🌱 Creando plataformas de streaming...');
  const netflix = await prisma.platform.create({
    data: { name: 'Netflix', logoLetters: 'N', requiresSubscription: true },
  });
  const prime = await prisma.platform.create({
    data: { name: 'Prime Video', logoLetters: 'P', requiresSubscription: true },
  });
  const disney = await prisma.platform.create({
    data: { name: 'Disney+', logoLetters: 'D+', requiresSubscription: true },
  });

  // Mapeo seguro con inferencia estática para evitar el error de noUncheckedIndexedAccess
  const platformMap = {
    'Netflix': netflix.id,
    'Prime Video': prime.id,
    'Disney+': disney.id,
  };

  console.log('🎬 Creando películas y asignando plataformas...');
  
  await prisma.mediaContent.create({
    data: {
      id: 1,
      title: 'Avatar',
      type: 'Película',
      year: 2009,
      duration: '2h 42m',
      genres: 'Aventura, Ciencia ficción',
      synopsis: 'Un ex-marine es enviado a Pandora, un mundo alienígena habitado por los Na\'vi, donde se debate entre seguir órdenes o proteger su nuevo hogar.',
      imageUrl: '/uS67uczJFPMfNN4U5bWg4muU9nS.jpg',
      platforms: {
        create: [
          { platformId: platformMap['Netflix'], directLink: 'https://www.netflix.com' },
          { platformId: platformMap['Prime Video'], directLink: 'https://www.primevideo.com' },
          { platformId: platformMap['Disney+'], directLink: 'https://www.disneyplus.com' },
        ],
      },
    },
  });

  await prisma.mediaContent.create({
    data: {
      id: 2,
      title: 'Avatar: El Camino del Agua',
      type: 'Película',
      year: 2022,
      duration: '3h 12m',
      genres: 'Aventura, Acción',
      synopsis: 'Jake Sully vive con su familia en Pandora. Cuando una amenaza regresa, debe trabajar con el ejército Na\'vi para proteger su planeta.',
      imageUrl: '/nuxDeoDZHaZ8cdVqi1I3iXxVL39.jpg',
      platforms: {
        create: [
          { platformId: platformMap['Disney+'], directLink: 'https://www.disneyplus.com' },
        ],
      },
    },
  });

  await prisma.mediaContent.create({
    data: {
      id: 3,
      title: 'El Señor de los Anillos',
      type: 'Película',
      year: 2001,
      duration: '2h 58m',
      genres: 'Fantasía, Aventura',
      synopsis: 'Un joven Hobbit es encargado de destruir el Anillo Único para derrotar al Señor Oscuro Sauron.',
      imageUrl: '/9xtH1RmAzQ0rrMBNUMXstb2s3er.jpg',
      platforms: {
        create: [
          { platformId: platformMap['Prime Video'], directLink: 'https://www.primevideo.com' },
        ],
      },
    },
  });

  await prisma.mediaContent.create({
    data: {
      id: 4,
      title: 'Dune',
      type: 'Película',
      year: 2021,
      duration: '2h 35m',
      genres: 'Ciencia ficción, Drama',
      synopsis: 'Paul Atreides debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo.',
      imageUrl: '/1Op57Khovv3ANSWn3TvhMStBboV.jpg',
      platforms: {
        create: [
          { platformId: platformMap['Netflix'], directLink: 'https://www.netflix.com' },
          { platformId: platformMap['Prime Video'], directLink: 'https://www.primevideo.com' },
        ],
      },
    },
  });

  await prisma.mediaContent.create({
    data: {
      id: 5,
      title: 'Interestelar',
      type: 'Película',
      year: 2014,
      duration: '2h 49m',
      genres: 'Ciencia ficción, Drama',
      synopsis: 'Un grupo de científicos y exploradores ya a través de un agujero de gusano en el espacio para encontrar un nuevo hogar para la humanidad.',
      imageUrl: '/d1QKiYtceF3GDtxvTFXFAqwwah9.jpg',
      platforms: {
        create: [
          { platformId: platformMap['Netflix'], directLink: 'https://www.netflix.com' },
          { platformId: platformMap['Prime Video'], directLink: 'https://www.primevideo.com' },
        ],
      },
    },
  });

  await prisma.mediaContent.create({
    data: {
      id: 6,
      title: 'Blade Runner 2049',
      type: 'Película',
      year: 2017,
      duration: '2h 44m',
      genres: 'Ciencia ficción, Acción',
      synopsis: 'Un nuevo blade runner, el oficial K del departamento de policía de Los Ángeles, descubre un secreto enterrado que podría sumergir a la sociedad en el caos.',
      imageUrl: '/cOt8SQwrxpoTv9Bc3kyce3etkZX.jpg',
      platforms: {
        create: [
          { platformId: platformMap['Netflix'], directLink: 'https://www.netflix.com' },
        ],
      },
    },
  });

  await prisma.mediaContent.create({
    data: {
      id: 7,
      title: 'The Batman',
      type: 'Película',
      year: 2022,
      duration: '2h 56m',
      genres: 'Acción, Crimen, Drama',
      synopsis: 'Cuando un asesino se dirige a la élite de Gotham con una serie de maquinaciones sádicas, el mejor detective del mundo es enviado a investigar.',
      imageUrl: '/mo7teil1qH0SxgLijnqeYP1Eb4w.jpg',
      platforms: {
        create: [
          { platformId: platformMap['Prime Video'], directLink: 'https://www.primevideo.com' },
        ],
      },
    },
  });

  console.log('🔗 Vinculando alternativas / sugerencias de películas...');
  const alternativesMap: Record<number, number[]> = {
    1: [2, 4, 5],
    2: [1],
    3: [7],
    4: [1, 3, 5, 6],
    5: [1, 2, 4, 6],
    6: [2, 4, 5, 7],
    7: [3, 6],
  };

  for (const [movieId, altIds] of Object.entries(alternativesMap)) {
    await prisma.mediaContent.update({
      where: { id: Number(movieId) },
      data: {
        alternatives: {
          connect: altIds.map(id => ({ id })),
        },
      },
    });
  }

  console.log('✅ ¡Semillero completado con éxito!');
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando la semilla:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });