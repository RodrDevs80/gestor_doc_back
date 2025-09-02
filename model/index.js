
import { sequelize } from "../config/config.js";
import Archivo from "./Archivo.js";
import Producto from "./Producto.js";

Producto.hasMany(Archivo,{
    foreignKey:'idPrducto',
    as:'archivo'
})
Archivo.belongsTo(Producto,{
    foreignKey:'idProducto',
    as:'producto'
})


export{
    Archivo,
    Producto,
    sequelize
}
