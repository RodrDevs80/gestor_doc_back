import Producto from "../model/Producto.model.js";
import Archivo from "../model/Archivo.model.js";
const getAllProductos = async (req, res) => {
  try {
    const allProductos = await Producto.findAll();
    if (allProductos.length === 0) {
      res.status(200).json({ status: 200, message: 'No hay productos en la base de datos!!!' })
    } else {
      res.status(200).json(allProductos);
    }
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el listado de productos", message: err.message });
  }
}

const getAllProductosActivos = async (req, res) => {
  try {
    const allProductosActivos = await Producto.scope("activos").findAll();
    if (allProductosActivos.length === 0) {
      res.status(200).json({ status: 200, message: 'No hay productos activos en la base de datos!!!' })
    } else {
      res.status(200).json(allProductosActivos);
    }
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el listado de Productos activos", message: err.message });
  }
}

const getProductoById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validación del ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID inválido'
      });
    }

    const ProductoById = await Producto.findByPk(id);
    if (ProductoById === null) {
      return res.status(404).json({ status: 404, title: 'Not Found', message: `No existe el Producto buscado con el id: ${id}` });
    }

    res.status(200).json({ status: 200, Producto: ProductoById });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el Producto", message: err.message });
  }
}


const createProducto = async (req, res) => {
  try {
    const nombreImagen = req.file.filename;
    const { nombre,
      descripcion,
      precio, stock } = req.body

    // Validación básica de campos requeridos
    if (!nombre || !descripcion || !precio || !stock) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'Los campos nombre, descripción, precio y stock son obligatorios'
      });
    }
    if (!nombreImagen) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'La imagen es obligatoria'
      });
    }

    const newProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      imagenUrl: `http://localhost:3000/api/v1/files/image/portadas/${nombreImagen}`,
      stock
    });

    res.status(201).json({
      status: 201,
      message: 'Se creó de manera exitosa un nuevo producto',
      newProducto
    });
  } catch (err) {

    res.status(500).json({
      error: "Error al intentar crear un nuevo Producto",
      message: err.message
    });
  }
};
const updateProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validación del ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID inválido'
      });
    }

    const { nombre,
      descripcion,
      precio,
      imagenUrl,
      stock } = req.body;
    const productoAActualizar = await Producto.findByPk(id);

    if (productoAActualizar === null) {
      return res.status(404).json({ status: 404, title: 'Not Found', message: `No existe el Producto buscado con el id: ${id}` });
    }

    // Crear objeto con solo los campos que se van a actualizar
    const camposAActualizar = {};
    if (nombre !== undefined) camposAActualizar.nombre = nombre;
    if (descripcion !== undefined) camposAActualizar.descripcion = descripcion;
    if (precio !== undefined) camposAActualizar.precio = precio;
    if (imagenUrl !== undefined) camposAActualizar.imagenUrl = imagenUrl;
    if (stock !== undefined) camposAActualizar.stock = stock;


    await Producto.update(camposAActualizar, {
      where: { id }
    });

    res.status(200).json({ status: 200, message: `Se actualizó correctamente el producto con el id: ${id}` });
  } catch (err) {
    res.status(500).json({ error: "Error al intentar actualizar el Producto", message: err.message });
  }
}

const deleteProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validación del ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID inválido'
      });
    }

    const productoAEliminar = await Producto.findByPk(id);
    if (productoAEliminar === null) {
      return res.status(404).json({ status: 404, title: 'Not Found', message: 'No existe el producto buscado' });
    }

    await Producto.destroy({
      where: { id }
    });

    res.status(200).json({ status: 200, message: `Se eliminó correctamente el producto con el id: ${id}`, ProductoEliminado: productoAEliminar });
  } catch (err) {
    res.status(500).json({ error: "Error al intentar eliminar Producto", message: err.message });
  }
}

const deleteLogicoProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validación del ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID inválido'
      });
    }

    const producto = await Producto.findByPk(id);

    if (producto === null) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: 'No existe el Producto buscado'
      });
    }

    await Producto.update(
      { activo: !producto.activo },
      { where: { id } }
    );

    res.status(200).json({
      status: 200,
      message: `Estado del Producto ${producto.activo ? 'desactivado' : 'activado'} correctamente`
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al intentar modificar el estado del Producto",
      message: err.message
    });
  }
}
const modificarImagenPrincipalDeProducto = async (req, res) => {
  try {
    const { id, idImagen } = req.params

    // Validación del ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID inválido'
      });
    }
    if (isNaN(idImagen) || idImagen <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID imagen inválido'
      });
    }

    const producto = await Producto.findByPk(id);
    const img = await Archivo.findOne({ where: { id: idImagen } })


    if (!producto) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: 'No existe el Producto buscado'
      });
    }

    if (img.idProducto = !id) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: 'La imagen no corresponde al Producto buscado'
      });
    }

    await Producto.update(
      { imagenUrl: `http://localhost:3000/api/v1/files/image/${id}/${img.nombre}` },
      { where: { id } }
    );

    res.status(200).json({
      status: 200,
      message: `La imagen del Producto a sido modificada correctamente`
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al intentar modificar la imagen del Producto",
      message: err.message
    });
  }
}

export { getAllProductos, getAllProductosActivos, getProductoById, createProducto, updateProducto, deleteProducto, deleteLogicoProducto, modificarImagenPrincipalDeProducto }