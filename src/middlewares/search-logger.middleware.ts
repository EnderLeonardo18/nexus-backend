import type { Request, Response, NextFunction } from "express";

export function searchLoggerMiddleware(req: Request, res: Response, next: NextFunction): void {
    const query = req.query.q;
    console.log(`[🔍 Nexus Search] Consulta recibida a las ${new Date().toLocaleTimeString()} - Buscando: "${query || 'Ninguno'}"`);
    next(); // Permite que la petición continúe al controlador
}