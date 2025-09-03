# Gestor de Documentos - Backend API

## Descripción

Este proyecto es una API RESTful construida con Express.js y Sequelize para gestionar productos y sus archivos asociados. Proporciona endpoints para operaciones CRUD de productos, subida/descarga de archivos, y gestión de documentos relacionados con cada producto.

## Características

- ✅ API RESTful con Express.js
- ✅ Base de datos MySQL con Sequelize ORM
- ✅ Gestión de productos con campos completos
- ✅ Subida y descarga de archivos con Multer
- ✅ Validaciones de datos robustas
- ✅ Middleware de autenticación y autorización
- ✅ Endpoint de health check
- ✅ Manejo de errores centralizado
- ✅ Configuración mediante variables de entorno

## Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web para Node.js
- **Sequelize** - ORM para bases de datos SQL
- **MySQL** - Sistema de gestión de bases de datos
- **Multer** - Middleware para manejo de multipart/form-data
- **CORS** - Middleware para habilitar CORS
- **Morgan** - Middleware para logging de HTTP requests
- **bcrypt** - Para hashing de contraseñas (preparado para futuras implementaciones)

## Estructura del Proyecto

```
gestor_doc_back/
├── config/
│   └── config.js          # Configuración de la base de datos y variables de entorno
├── controller/
│   ├── archivo.controller.js  # Lógica para manejo de archivos
│   └── producto.controller.js # Lógica para manejo de productos
├── middleware/
│   ├── multer.middleware.js   # Configuración de Multer para subida de archivos
│   └── validateExistencia.js  # Middleware para validar existencia de registros
├── model/
│   ├── Archivo.model.js       # Modelo de datos para archivos
│   ├── Producto.model.js      # Modelo de datos para productos
│   └── index.model.js         # Relaciones entre modelos
├── routes/
│   ├── archivos.routes.js     # Rutas para gestión de archivos
│   ├── index.routes.js        # Agrupador de todas las rutas
│   └── producto.routes.js     # Rutas para gestión de productos
├── scripts/
│   └── sync.js                # Script para sincronizar modelos con la base de datos
├── uploads/                   # Directorio donde se almacenan los archivos subidos
├── .env                       # Variables de entorno (no incluido en el repositorio)
├── index.js                   # Punto de entrada de la aplicación
└── package.json               # Dependencias y scripts del proyecto
```

## Instalación y Configuración

### Prerrequisitos

- Node.js (v16 o superior)
- MySQL (v5.7 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd gestor_doc_back
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   PORT=3000
   RAIZ=/api/v1
   DATABASE=nombre_base_datos
   NAME=usuario_mysql
   PASSWORD=contraseña_mysql
   HOST=localhost
   DIALECT=mysql
   DB_PORT=3306
   ```

4. **Configurar la base de datos**

   ```bash
   # Crear la base de datos manualmente en MySQL
   mysql -u root -p
   CREATE DATABASE nombre_base_datos;
   ```

5. **Sincronizar modelos con la base de datos**

   ```bash
   node scripts/sync.js
   ```

6. **Ejecutar la aplicación**

   ```bash
   # Modo desarrollo (con watch)
   npm run dev

   # Modo producción
   npm start
   ```

## Endpoints de la API

### Health Check

- **GET** `/health` - Verificar el estado de la API

### Productos

- **GET** `/api/v1/productos/all` - Obtener todos los productos
- **GET** `/api/v1/productos/activos` - Obtener productos activos
- **GET** `/api/v1/productos/:id` - Obtener producto por ID
- **POST** `/api/v1/productos/` - Crear nuevo producto
- **PUT** `/api/v1/productos/:id` - Actualizar producto
- **DELETE** `/api/v1/productos/:id` - Eliminación física de producto
- **PATCH** `/api/v1/productos/:id` - Eliminación lógica (activar/desactivar)

### Archivos

- **POST** `/api/v1/files/upload/:idProducto` - Subir archivo para un producto
- **GET** `/api/v1/files/:idProducto` - Obtener archivos de un producto
- **GET** `/api/v1/files/download/:fileName` - Descargar archivo específico
- **DELETE** `/api/v1/files/:id` - Eliminar archivo por ID

## Modelos de Datos

### Producto

```javascript
{
  id: Integer (PK, Auto Increment),
  nombre: String (2-100 chars, required),
  descripcion: Text (10-2000 chars, required),
  precio: Decimal(10,2) (min 0.01, required),
  imagenUrl: String (URL, 5-500 chars, required),
  activo: Boolean (default: true),
  stock: Integer (min 0, default: 1),
  FechaDeCreacion: Timestamp,
  FechaDeActualizacion: Timestamp
}
```

### Archivo

```javascript
{
  id: Integer (PK, Auto Increment),
  nombre: String (required, validated),
  nombreOriginal: String (required, validated),
  tipo: String (required, validated mimetypes),
  peso: Float (required, min 0.001, max 10MB),
  ruta: String (required, validated),
  idProducto: Integer (FK to Producto, required),
  fechaSubida: Timestamp
}
```

## Uso de la API

### Ejemplo: Crear un producto

```bash
curl -X POST http://localhost:3000/api/v1/productos/ \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Producto Ejemplo",
    "descripcion": "Descripción detallada del producto ejemplo",
    "precio": 29.99,
    "imagenUrl": "https://ejemplo.com/imagen.jpg",
    "stock": 50
  }'
```

### Ejemplo: Subir un archivo

```bash
curl -X POST http://localhost:3000/api/v1/files/upload/1 \
  -H "Content-Type: multipart/form-data" \
  -F "archivo=@/ruta/al/archivo.pdf"
```

### Ejemplo: Descargar un archivo

```bash
curl -O http://localhost:3000/api/v1/files/download/nombre-del-archivo.pdf
```

## Validaciones

### Productos

- Nombre: 2-100 caracteres, requerido
- Descripción: 10-2000 caracteres, requerido
- Precio: decimal positivo, requerido
- ImagenUrl: URL válida, requerido
- Stock: entero no negativo, requerido

### Archivos

- Tipos permitidos: imágenes (jpeg, png, gif, webp, svg), PDF, texto, documentos Word
- Tamaño máximo: 10MB
- Validación de existencia del producto asociado

## Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo con watch
- `npm start` - Ejecutar en modo producción
- `node scripts/sync.js` - Sincronizar modelos con la base de datos

## Consideraciones de Seguridad

- Validación exhaustiva de datos de entrada
- Limitación de tamaño de archivos (10MB)
- Validación de tipos MIME permitidos
- Sanitización de nombres de archivo
- Configuración CORS para orígenes permitidos

## Manejo de Errores

La API devuelve respuestas consistentes con códigos HTTP apropiados:

- 200: Éxito
- 201: Recurso creado
- 400: Solicitud incorrecta
- 404: Recurso no encontrado
- 500: Error interno del servidor

## Próximas Mejoras

- [ ] Autenticación y autorización con JWT
- [ ] Paginación para listados
- [ ] Filtros y búsqueda avanzada
- [ ] Sistema de roles y permisos
- [ ] Documentación con Swagger/OpenAPI
- [ ] Tests unitarios e integrales
- [ ] Dockerización del proyecto
- [ ] Logging más detallado
- [ ] Rate limiting
- [ ] Cache con Redis

## Contribución

1. Fork del proyecto
2. Crear una rama para la feature (`git checkout -b feature/AmazingFeature`)
3. Commit de los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## Soporte

Para soporte o preguntas, contactar al equipo de desarrollo o crear un issue en el repositorio.

---

**Nota**: Asegúrese de configurar correctamente las variables de entorno y la base de datos antes de ejecutar la aplicación.
