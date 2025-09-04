import { Router } from "express";
import { createProducto, deleteLogicoProducto, deleteProducto, getAllProductos, getAllProductosActivos, getProductoById, modificarImagenPrincipalDeProducto, updateProducto } from "../controller/producto.controller.js";


const routerProducto = Router();

routerProducto.get("/all", getAllProductos);

routerProducto.get("/activos", getAllProductosActivos);


routerProducto.get('/:id', getProductoById);

routerProducto.post("/", createProducto);

routerProducto.put('/:id', updateProducto);

//Eliminación física
routerProducto.delete('/:id', deleteProducto);

// Eliminación lógica
routerProducto.patch("/:id", deleteLogicoProducto);


routerProducto.patch("/modificar-imagenUrl/:id/:idImagen", modificarImagenPrincipalDeProducto);

export default routerProducto;