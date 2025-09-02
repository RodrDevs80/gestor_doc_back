import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";

const Producto = sequelize.define("Producto", {
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
    validate: {
      notNull: {
        msg: "El nombre es obligatorio"
      },
      notEmpty: {
        msg: "El nombre no puede estar vacío"
      },
      len: {
        args: [2, 100],
        msg: "El nombre debe tener entre 2 y 100 caracteres"
      }
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "La descripción es obligatoria"
      },
      notEmpty: {
        msg: "La descripción no puede estar vacía"
      },
      len: {
        args: [10, 2000],
        msg: "La descripción debe tener entre 10 y 2000 caracteres"
      }
    }
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notNull: {
        msg: "El precio es obligatorio"
      },
      isDecimal: {
        msg: "El precio debe ser un número decimal válido"
      },
      min: {
        args: [0.01],
        msg: "El precio debe ser mayor a 0"
      },
      max: {
        args: [9999999.99],
        msg: "El precio no puede exceder 9,999,999.99"
      }
    }
  },
  imagenUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "La URL de la imagen es obligatoria"
      },
      notEmpty: {
        msg: "La URL de la imagen no puede estar vacía"
      },
      isUrl: {
        msg: "Debe proporcionar una URL válida para la imagen"
      },
      len: {
        args: [5, 500],
        msg: "La URL de la imagen debe tener entre 5 y 500 caracteres"
      }
    }
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      notNull: {
        msg: "El stock es obligatorio"
      },
      isInt: {
        msg: "El stock debe ser un número entero"
      },
      min: {
        args: [0],
        msg: "El stock no puede ser negativo"
      },
      max: {
        args: [1000000],
        msg: "El stock no puede exceder 1,000,000 unidades"
      }
    }
  }
}, {
  tableName: "producto",
  timestamps: true,
  createdAt: "FechaDeCreacion",
  updatedAt: "FechaDeActualizacion",
  scopes: {
    activos: { where: { activo: true } }
  }
});

export default Producto;