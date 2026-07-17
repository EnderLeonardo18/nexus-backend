-- 1. LIMPIEZA DE DATOS PREVIOS (Usamos DELETE para evitar el bloqueo de TRUNCATE)
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM `_MediaAlternatives`;
DELETE FROM `media_platforms`;
DELETE FROM `platforms`;
DELETE FROM `media_content`;
SET FOREIGN_KEY_CHECKS = 1;

-- 2. INSERTAR PLATAFORMAS (Con IDs fijos para relacionar fácil)
INSERT INTO `platforms` (`id`, `name`, `logo_letters`, `requires_subscription`) VALUES
(1, 'Netflix', 'N', 1),
(2, 'Prime Video', 'P', 1),
(3, 'Disney+', 'D+', 1);

-- 3. INSERTAR CONTENIDO MULTIMEDIA (Con sus rutas de imagen reales del seed)
INSERT INTO `media_content` (`id`, `title`, `type`, `year`, `duration`, `genres`, `synopsis`, `image_url`) VALUES
(1, 'Avatar', 'Película', 2009, '2h 42m', 'Aventura, Ciencia ficción', 'Un ex-marine es enviado a Pandora, un mundo alienígena habitado por los Na\'vi, donde se debate entre seguir órdenes o proteger su nuevo hogar.', '/uS67uczJFPMfNN4U5bWg4muU9nS.jpg'),
(2, 'Avatar: El Camino del Agua', 'Película', 2022, '3h 12m', 'Aventura, Acción', 'Jake Sully vive con su familia en Pandora. Cuando una amenaza regresa, debe trabajar con el ejército Na\'vi para proteger su planeta.', '/nuxDeoDZHaZ8cdVqi1I3iXxVL39.jpg'),
(3, 'El Señor de los Anillos', 'Película', 2001, '2h 58m', 'Fantasía, Aventura', 'Un joven Hobbit es encargado de destruir el Anillo Único para derrotar al Señor Oscuro Sauron.', '/9xtH1RmAzQ0rrMBNUMXstb2s3er.jpg'),
(4, 'Dune', 'Película', 2021, '2h 35m', 'Ciencia ficción, Drama', 'Paul Atreides debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo.', '/1Op57Khovv3ANSWn3TvhMStBboV.jpg'),
(5, 'Interestelar', 'Película', 2014, '2h 49m', 'Ciencia ficción, Drama', 'Un grupo de científicos y exploradores viaja a través de un agujero de gusano en el espacio para encontrar un nuevo hogar para la humanidad.', '/d1QKiYtceF3GDtxvTFXFAqwwah9.jpg'),
(6, 'Blade Runner 2049', 'Película', 2017, '2h 44m', 'Ciencia ficción, Acción', 'Un nuevo blade runner, el oficial K del departamento de policía de Los Ángeles, descubre un secreto enterrado que podría sumergir a la sociedad en el caos.', '/cOt8SQwrxpoTv9Bc3kyce3etkZX.jpg'),
(7, 'The Batman', 'Película', 2022, '2h 56m', 'Acción, Crimen, Drama', 'Cuando un asesino se dirige a la élite de Gotham con una serie de maquinaciones sádicas, el mejor detective del mundo es enviado a investigar.', '/mo7teil1qH0SxgLijnqeYP1Eb4w.jpg');

-- 4. RELACIONAR PELÍCULAS CON SUS PLATAFORMAS
INSERT INTO `media_platforms` (`media_id`, `platform_id`, `direct_link`) VALUES
-- Avatar (Netflix, Prime, Disney)
(1, 1, 'https://www.netflix.com'),
(1, 2, 'https://www.primevideo.com'),
(1, 3, 'https://www.disneyplus.com'),
-- Avatar 2 (Disney)
(2, 3, 'https://www.disneyplus.com'),
-- El Señor de los Anillos (Prime)
(3, 2, 'https://www.primevideo.com'),
-- Dune (Netflix, Prime)
(4, 1, 'https://www.netflix.com'),
(4, 2, 'https://www.primevideo.com'),
-- Interestelar (Netflix, Prime)
(5, 1, 'https://www.netflix.com'),
(5, 2, 'https://www.primevideo.com'),
-- Blade Runner 2049 (Netflix)
(6, 1, 'https://www.netflix.com'),
-- The Batman (Prime)
(7, 2, 'https://www.primevideo.com');

-- 5. RELACIONAR ALTERNATIVAS (Mapeo exacto sin llaves duplicadas)
INSERT INTO `_MediaAlternatives` (`A`, `B`) VALUES
-- Conexiones de Avatar (1): conecta con 2, 4, 5
(1, 2), (1, 4), (1, 5),
-- Conexiones de El Señor de los Anillos (3): conecta con 7 y 4
(3, 7), (3, 4),
-- Conexiones de Dune (4): conecta con 5, 6
(4, 5), (4, 6),
-- Conexiones de Interestelar (5): conecta con 2, 6
(2, 5), (5, 6),
-- Conexiones de Blade Runner 2049 (6): conecta con 2, 7
(2, 6), (6, 7);