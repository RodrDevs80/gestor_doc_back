import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
//: POST /api/v1/files/upload  implementar lógica: (ej: /uploads/productos/{id}).
//multipart/form-data
// Crear un endpoint para obtener la lista de archivos de un producto específico
//(ej: GET /api/v1/files/:idProducto).
//Crear un endpoint para descargar un archivo específico (ej: GET
// /api/v1/files/download/:fileName), configurando las cabeceras HTTP adecuadas para
//forzar la descarga.

const routerArchivos = Router();
//subir archivo
routerArchivos.post('/upload/:idProducto', upload.single('archivo'), (req, res) => {
    // aqui guardae en base de datos el archivo

    res.json({
        message: 'Archivo subido exitosamente',
        file: {
            filename: req.file.filename,
            path: req.file.path,
            type: req.file.fileType,
            size: req.file.size,
            uploadedAt: req.file.uploadedAt
        }
    });
})
//lista de archivos de un producto específico
routerArchivos.get('/:idProducto', (req, res) => {

})
//descargar un archivo específico
routerArchivos.get('/download/:fileName', (req, res) => {

})

export default routerArchivos;