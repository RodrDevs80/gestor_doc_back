import { Router } from "express";
import productoRoutes from "./producto.routes.js";
import routerArchivos from "./archivos.routes.js";

const allRouter = Router();
// /api/v1/productos   crear  -post
// /api/v1/productos/:id  actualizar -put
// /api/v1/productos/:id  mostrar por id  -get by id
// /api/v1/productos/activos  mostrar activos -get by activos 
// /api/v1/productos/all      mostrar todos  -get all
// /api/v1/productos          borrado físico  -delete
// /api/v1/productos          borrado lógico  -patch 
allRouter.use("/productos", productoRoutes);
//: POST /api/v1/files/upload  implementar lógica: (ej: /uploads/productos/{id}).
//multipart/form-data
// Crear un endpoint para obtener la lista de archivos de un producto específico
//(ej: GET /api/v1/files/:productId).
//Crear un endpoint para descargar un archivo específico (ej: GET
// /api/v1/files/download/:fileName), configurando las cabeceras HTTP adecuadas para
//forzar la descarga.
allRouter.use("/files", routerArchivos);

export default allRouter;