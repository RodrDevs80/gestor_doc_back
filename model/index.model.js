
import { sequelize } from "../config/config.js";
import Archivo from "./Archivo.model.js";
import Producto from "./Producto.model.js";

Producto.hasMany(Archivo, {
    foreignKey: 'idProducto',
    as: 'archivos'
})

Archivo.belongsTo(Producto, {
    foreignKey: 'idProducto',
    as: 'producto'
})


export {
    sequelize
}
