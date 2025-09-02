import { DataTypes } from "sequelize";
import {sequelize} from '../config/config.js'
import Producto from "./Producto.js";
const Archivo= sequelize.define('archivo',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    peso:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
    fechaSubida:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    idProducto:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
        model: Producto,
        key: "id",
      },
    }
},{
    tableName:'archivo',
    timestamps:false
})

export default Archivo