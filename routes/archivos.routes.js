import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import validateExistencia from "../middleware/validateExistencia.js";
import Producto from "../model/Producto.model.js";
import fs from "fs"
import { deleteArchivo, downloadArchivo, getAllArchivosByIdProducto, uploadArchivo } from "../controller/archivo.controller.js";
import Archivo from "../model/Archivo.model.js";
import path from "path";
//: POST /api/v1/files/upload  implementar lógica: (ej: /uploads/productos/{id}).
//multipart/form-data
// Crear un endpoint para obtener la lista de archivos de un producto específico
//(ej: GET /api/v1/files/:idProducto).
//Crear un endpoint para descargar un archivo específico (ej: GET
// /api/v1/files/download/:fileName), configurando las cabeceras HTTP adecuadas para
//forzar la descarga.

const routerArchivos = Router();
//subir archivo
routerArchivos.post('/upload/:idProducto', validateExistencia(Producto, 'idProducto'), upload.single('archivo'), uploadArchivo)
//lista de archivos de un producto específico
routerArchivos.get('/:idProducto', validateExistencia(Producto, 'idProducto'), getAllArchivosByIdProducto)
//descargar un archivo específico
routerArchivos.get('/download/:fileName', downloadArchivo);
//eliminar archivo por id  http://localhost:3000/api/v1/files/9
routerArchivos.delete('/:id', deleteArchivo)
export default routerArchivos;
