import Archivo from "../model/Archivo.model.js";
import Producto from "../model/Producto.model.js";
import fs from 'fs';
import path from "path";

const uploadArchivo = async (req, res) => {
  try {
    const { id } = req.foundRecord;

    const archivo = await Archivo.create({
      nombre: req.file.filename,
      nombreOriginal: req.file.originalname,
      tipo: req.file.mimetype,
      peso: req.file.size,
      ruta: req.file.path,
      idProducto: id
    })

    res.json({
      status: 201,
      message: 'Archivo subido y creado exitosamente',
      file: archivo
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al intentar crear nuevo Archivo",
      message: err.message
    });
  }

}




const getAllArchivosByIdProducto = async (req, res) => {
  try {
    const { id } = req.foundRecord;

    const archivos = await Archivo.findAll({
      where: {
        idProducto: id
      }
    });
    const producto = await Producto.findByPk(id);

    res.json({
      status: 200,
      message: 'Listado de archivos por producto',
      producto: producto,
      archivos: archivos
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al intentar listar archivos",
      message: err.message
    });
  }

}



const downloadArchivo = async (req, res) => {
  try {
    const { fileName } = req.params;

    const archivo = await Archivo.findOne({
      where: { nombre: fileName }
    });

    if (!archivo) {
      return res.status(404).json({
        error: "Archivo no encontrado",
        message: `El archivo ${fileName} no existe`
      });
    }

    if (!fs.existsSync(archivo.ruta)) {
      return res.status(404).json({
        error: "Archivo no disponible",
        message: "El archivo no se encuentra en el servidor"
      });
    }


    res.download(archivo.ruta, archivo.nombreOriginal, (err) => {
      if (err) {
        console.error('Error en la descarga:', err);
        if (!res.headersSent) {
          res.status(500).json({
            error: "Error en la descarga",
            message: err.message
          });
        }
      }
    });

  } catch (err) {
    console.error('Error general:', err);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Error al intentar descargar archivo",
        message: err.message
      });
    }
  }
}
const deleteArchivo = async (req, res) => {
  try {
    const { id } = req.params;
    const archivo = await Archivo.findByPk(id);

    if (!archivo) {
      return res.status(404).json({
        error: "Archivo no encontrado",
        message: `El archivo con ID ${id} no existe`
      });
    }

    const filePath = path.join(process.cwd(), archivo.ruta);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await archivo.destroy();

    res.status(200).json({
      success: true,
      status: 200,
      message: "El archivo se eliminó correctamente"
    });

  } catch (err) {
    console.error('Error general:', err);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Error al intentar eliminar archivo",
        message: err.message
      });
    }
  }
}
export { uploadArchivo, getAllArchivosByIdProducto, downloadArchivo, deleteArchivo }