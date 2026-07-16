import express from 'express';
import cors from 'cors';
import mediaRoutes from './routes/media.routes.js'; // Asegúrate de que la ruta a tus archivos coincida

const app = express();

// 1. Middlewares Globales
app.use(cors());
app.use(express.json());

// 2. Montar las rutas modulares
// Esto redirigirá '/api/media/search' hacia el media.routes.ts automáticamente
app.use('/api/media', mediaRoutes);

// Exportamos la instancia de la app lista para ser encendida
export default app;