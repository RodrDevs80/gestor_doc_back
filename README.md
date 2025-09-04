# API de Gestión de Productos y Archivos

Esta API proporciona un sistema completo para gestionar productos y sus archivos asociados (imágenes y documentos). Está construida con Node.js, Express.js y Sequelize como ORM para la base de datos.

## 📋 Tabla de Contenidos

- [Requisitos del Sistema](#requisitos-del-sistema)
- [Instalación y Configuración](#instalación-y-configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Modelos de Base de Datos](#modelos-de-base-de-datos)
- [Endpoints de la API](#endpoints-de-la-api)
  - [Productos](#endpoints-de-productos)
  - [Archivos](#endpoints-de-archivos)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Manejo de Errores](#manejo-de-errores)
- [Consideraciones de Seguridad](#consideraciones-de-seguridad)

## 🛠 Requisitos del Sistema

- Node.js (v14 o superior)
- npm o yarn
- Base de datos compatible con Sequelize (MySQL, PostgreSQL, SQLite, etc.)
- Espacio en disco para almacenamiento de archivos

## ⚙️ Instalación y Configuración

1. **Clonar o descargar el proyecto**
2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   PORT=3000
   RAIZ=http://localhost:3000
   DATABASE=nombre_base_datos
   NAME=usuario_base_datos
   PASSWORD=contraseña_base_datos
   HOST=localhost
   DIALECT=mysql
   DB_PORT=3306
   ```

4. **Sincronizar la base de datos:**

   ```bash
   # Ejecutar el script de sincronización
   npm run sync
   ```

5. **Iniciar el servidor:**
   ```bash
   npm start
   ```

## 📁 Estructura del Proyecto

```
├── config/
│   └── config.js          # Configuración de la base de datos y variables de entorno
├── controller/
│   ├── archivo.controller.js  # Lógica para manejo de archivos
│   └── producto.controller.js # Lógica para manejo de productos
├── middleware/
│   ├── multer.middleware.js   # Configuración de Multer para uploads
│   └── validateExistencia.js  # Middleware para validar existencia de registros
├── model/
│   ├── Archivo.model.js       # Modelo de datos para archivos
│   ├── Producto.model.js      # Modelo de datos para productos
│   └── index.model.js         # Relaciones entre modelos
├── routes/
│   ├── archivos.routes.js     # Rutas para endpoints de archivos
│   ├── producto.routes.js     # Rutas para endpoints de productos
│   └── index.routes.js        # Agrupador de rutas
├── scripts/
│   └── sync.js                # Script para sincronizar base de datos
└── uploads/
    └── productos/             # Directorio donde se almacenan los archivos subidos
```

## 🔧 Variables de Entorno

| Variable | Descripción                    | Ejemplo               |
| -------- | ------------------------------ | --------------------- |
| PORT     | Puerto donde corre el servidor | 3000                  |
| RAIZ     | URL base de la API             | http://localhost:3000 |
| DATABASE | Nombre de la base de datos     | mi_tienda             |
| NAME     | Usuario de la base de datos    | root                  |
| PASSWORD | Contraseña de la base de datos | password123           |
| HOST     | Host de la base de datos       | localhost             |
| DIALECT  | Tipo de base de datos          | mysql                 |
| DB_PORT  | Puerto de la base de datos     | 3306                  |

## 🗃️ Modelos de Base de Datos

### Producto

- `id` (INT, PK, Auto Increment)
- `nombre` (STRING, obligatorio)
- `descripcion` (TEXT, obligatorio)
- `precio` (DECIMAL(10,2), obligatorio)
- `imagenUrl` (STRING, obligatorio)
- `activo` (BOOLEAN, default: true)
- `stock` (INTEGER, default: 1)
- `FechaDeCreacion` (TIMESTAMP)
- `FechaDeActualizacion` (TIMESTAMP)

### Archivo

- `id` (INT, PK, Auto Increment)
- `nombre` (STRING, obligatorio)
- `nombreOriginal` (STRING, obligatorio)
- `tipo` (STRING, obligatorio)
- `peso` (FLOAT, obligatorio)
- `ruta` (STRING, obligatorio)
- `idProducto` (INT, FK a Producto)
- `fechaSubida` (TIMESTAMP)

## 🌐 Endpoints de la API

### Endpoints de Productos

#### Obtener todos los productos

```
GET /api/v1/productos/all
```

**Respuesta exitosa:**

```json
[
  {
    "id": 1,
    "nombre": "Producto Ejemplo",
    "descripcion": "Descripción del producto",
    "precio": "29.99",
    "imagenUrl": "http://localhost:3000/api/v1/files/image/1/imagen.jpg",
    "activo": true,
    "stock": 10,
    "FechaDeCreacion": "2023-10-15T12:00:00.000Z",
    "FechaDeActualizacion": "2023-10-15T12:00:00.000Z"
  }
]
```

#### Obtener productos activos

```
GET /api/v1/productos/activos
```

#### Obtener producto por ID

```
GET /api/v1/productos/:id
```

#### Crear nuevo producto

```
POST /api/v1/productos/
```

**Body:**

```json
{
  "nombre": "Nuevo Producto",
  "descripcion": "Descripción del nuevo producto",
  "precio": 49.99,
  "imagenUrl": "http://example.com/imagen.jpg",
  "stock": 15
}
```

#### Actualizar producto

```
PUT /api/v1/productos/:id
```

**Body:** (campos opcionales)

```json
{
  "nombre": "Producto Actualizado",
  "precio": 39.99,
  "stock": 20
}
```

#### Eliminación física de producto

```
DELETE /api/v1/productos/:id
```

#### Eliminación lógica de producto (activar/desactivar)

```
PATCH /api/v1/productos/:id
```

#### Modificar imagen principal de producto

```
PATCH /api/v1/productos/modificar-imagenUrl/:id/:idImagen
```

### Endpoints de Archivos

#### Subir un archivo para un producto

```
POST /api/v1/files/upload/:idProducto
```

**Headers:**

```
Content-Type: multipart/form-data
```

**Body:**

- `archivo` (file): Archivo a subir

#### Subir múltiples archivos para un producto

```
POST /api/v1/files/upload/multiple/:idProducto
```

**Headers:**

```
Content-Type: multipart/form-data
```

**Body:**

- `archivos` (files): Múltiples archivos a subir (hasta 10)

#### Obtener archivos de un producto

```
GET /api/v1/files/:idProducto
```

#### Descargar un archivo

```
GET /api/v1/files/download/:fileName
```

#### Eliminar un archivo

```
DELETE /api/v1/files/:id
```

#### Servir imagen (para uso en frontend)

```
GET /api/v1/files/image/:productId/:fileName
```

#### Obtener URLs de todas las imágenes de un producto

```
GET /api/v1/files/imagenes-db/:productId
```

#### Obtener información de una imagen específica

```
GET /api/v1/files/imagen-db/:id
```

## 📋 Ejemplos de Uso

### Ejemplo 1: Crear un producto y subir imágenes

```javascript
// 1. Crear el producto
const createProduct = async () => {
  const response = await fetch("http://localhost:3000/api/v1/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: "Smartphone XYZ",
      descripcion: "Último modelo con características avanzadas",
      precio: 599.99,
      imagenUrl: "http://placeholder.com/phone.jpg",
      stock: 25,
    }),
  });

  const product = await response.json();
  return product.newProducto.id;
};

// 2. Subir imágenes para el producto
const uploadImages = async (productId) => {
  const formData = new FormData();

  // Agregar múltiples archivos
  formData.append("archivos", imageFile1);
  formData.append("archivos", imageFile2);

  const response = await fetch(
    `http://localhost:3000/api/v1/files/upload/multiple/${productId}`,
    {
      method: "POST",
      body: formData,
    }
  );

  return await response.json();
};

// Ejecutar
const productId = await createProduct();
await uploadImages(productId);
```

### Ejemplo 2: Obtener producto con sus imágenes

```javascript
// 1. Obtener información del producto
const getProduct = async (id) => {
  const response = await fetch(`http://localhost:3000/api/v1/productos/${id}`);
  return await response.json();
};

// 2. Obtener imágenes del producto
const getProductImages = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/files/imagenes-db/${id}`
  );
  return await response.json();
};

// Ejecutar
const productId = 1;
const product = await getProduct(productId);
const images = await getProductImages(productId);

console.log("Producto:", product);
console.log("Imágenes:", images.images);
```

### Ejemplo 3: Usar imágenes en frontend

```html
<!-- Mostrar imagen principal -->
<img
  src="http://localhost:3000/api/v1/files/image/1/123456-abc123.jpg"
  alt="Nombre del producto"
/>

<!-- Galería de imágenes -->
<div class="image-gallery">
  <script>
    fetch("http://localhost:3000/api/v1/files/imagenes-db/1")
      .then((response) => response.json())
      .then((data) => {
        data.images.forEach((image) => {
          const imgElement = document.createElement("img");
          imgElement.src = image.apiUrl;
          imgElement.alt = image.originalName;
          document.querySelector(".image-gallery").appendChild(imgElement);
        });
      });
  </script>
</div>
```

## ⚠️ Manejo de Errores

La API utiliza respuestas consistentes para errores:

### Errores de validación

```json
{
  "status": 400,
  "title": "Bad Request",
  "message": "ID inválido"
}
```

### Recurso no encontrado

```json
{
  "status": 404,
  "title": "Not Found",
  "message": "No existe el Producto buscado con el id: 999"
}
```

### Error interno del servidor

```json
{
  "error": "Error al intentar crear nuevo Archivo",
  "message": "Mensaje específico del error"
}
```

## 🔒 Consideraciones de Seguridad

1. **Validación de tipos de archivo:** Solo se permiten tipos específicos (imágenes, PDF, documentos).
2. **Límite de tamaño:** Los archivos no pueden exceder 10MB.
3. **Validación de entrada:** Todos los inputs son validados tanto en frontend como backend.
4. **Sanitización de nombres:** Los nombres de archivo se normalizan para prevenir path traversal.
5. **Validación de existencia:** Se verifica que los recursos existan antes de operar con ellos.

## 📞 Soporte

Para reportar issues o hacer preguntas sobre el uso de la API, contactar al equipo de desarrollo o crear un issue en el repositorio del proyecto.

---

**Nota:** Esta documentación está actualizada a la versión actual del código. Para cambios futuros, consultar el registro de actualizaciones o el historial de commits.
