import "dotenv/config";
import app from './app.js';

// Leemos el puerto desde las variables de entorno o usamos el 3000 por defecto
const PORT = process.env.PORT || 3000;

/**
 * Función de arranque del servidor web
 */
function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`=============================================`);
      console.log(` 🚀 Servidor Nexus Backend ejecutándose`);
      console.log(` 🔊 Puerto de escucha activo: http://localhost:${PORT}`);
      console.log(`=============================================`);
    });
  } catch (error) {
    console.error('❌ Error crítico al inicializar el servidor:', error);
    process.exit(1);
  }
}

// Encendemos la API
startServer();