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
- [Ejemplos de Uso Frontend](#ejemplos-de-uso-frontend)
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
   RAIZ=/api/v1
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

| Variable | Descripción                    | Ejemplo     |
| -------- | ------------------------------ | ----------- |
| PORT     | Puerto donde corre el servidor | 3000        |
| RAIZ     | URL base de la API             | /api/v1     |
| DATABASE | Nombre de la base de datos     | mi_tienda   |
| NAME     | Usuario de la base de datos    | root        |
| PASSWORD | Contraseña de la base de datos | password123 |
| HOST     | Host de la base de datos       | localhost   |
| DIALECT  | Tipo de base de datos          | mysql       |
| DB_PORT  | Puerto de la base de datos     | 3306        |

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

#### Actualizar producto

```
PUT /api/v1/productos/:id
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

#### Subir múltiples archivos para un producto

```
POST /api/v1/files/upload/multiple/:idProducto
```

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

## 📋 Ejemplos de Uso Frontend

### Ejemplo 1: Crear un producto y subir imágenes

```javascript
// 1. Crear el producto
const createProduct = async () => {
  const formData = new FormData();
  formData.append("nombre", "Smartphone XYZ");
  formData.append("descripcion", "Último modelo con características avanzadas");
  formData.append("precio", "599.99");
  formData.append("stock", "25");
  formData.append("imagenUrl[]", imageFile); // Archivo de imagen

  const response = await fetch("http://localhost:3000/api/v1/productos", {
    method: "POST",
    body: formData,
  });

  const product = await response.json();
  return product.newProducto.id;
};

// 2. Subir imágenes adicionales para el producto
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

### Ejemplo 3: Mostrar imágenes en HTML

```html
<!-- Mostrar imagen principal -->
<img
  src="http://localhost:3000/api/v1/files/image/portadas/123456-abc123.jpg"
  alt="Nombre del producto"
  class="product-main-image"
/>

<!-- Galería de imágenes adicionales -->
<div class="image-gallery">
  <script>
    fetch("http://localhost:3000/api/v1/files/imagenes-db/1")
      .then((response) => response.json())
      .then((data) => {
        const gallery = document.querySelector(".image-gallery");
        data.images.forEach((image) => {
          const imgElement = document.createElement("img");
          imgElement.src = image.apiUrl;
          imgElement.alt = image.originalName;
          imgElement.classList.add("gallery-image");
          gallery.appendChild(imgElement);
        });
      })
      .catch((error) => console.error("Error loading images:", error));
  </script>
</div>
```

### Ejemplo 4: Formulario de creación de producto

```html
<form id="productForm" enctype="multipart/form-data">
  <input type="text" name="nombre" placeholder="Nombre del producto" required />
  <textarea name="descripcion" placeholder="Descripción" required></textarea>
  <input
    type="number"
    name="precio"
    step="0.01"
    placeholder="Precio"
    required
  />
  <input type="number" name="stock" placeholder="Stock" required />
  <input type="file" name="imagenUrl[]" accept="image/*" required />
  <button type="submit">Crear Producto</button>
</form>

<script>
  document
    .getElementById("productForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      try {
        const response = await fetch("http://localhost:3000/api/v1/productos", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          alert("Producto creado exitosamente!");
          // Redirigir o limpiar formulario
        } else {
          alert("Error: " + result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al crear el producto");
      }
    });
</script>
```

### Ejemplo 5: Gestión de productos con interfaz de usuario

```javascript
// Función para cargar y mostrar productos
async function loadProducts() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/productos/activos"
    );
    const products = await response.json();

    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

    products.forEach((product) => {
      const productCard = `
        <div class="product-card">
          <img src="${product.imagenUrl}" alt="${product.nombre}">
          <h3>${product.nombre}</h3>
          <p>${product.descripcion.substring(0, 100)}...</p>
          <p class="price">$${product.precio}</p>
          <p class="stock">Stock: ${product.stock}</p>
          <button onclick="viewProduct(${product.id})">Ver Detalles</button>
        </div>
      `;
      productsContainer.innerHTML += productCard;
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Función para ver detalles del producto
async function viewProduct(productId) {
  const [product, images] = await Promise.all([
    fetch(`http://localhost:3000/api/v1/productos/${productId}`).then((r) =>
      r.json()
    ),
    fetch(`http://localhost:3000/api/v1/files/imagenes-db/${productId}`).then(
      (r) => r.json()
    ),
  ]);

  // Mostrar modal con detalles e imágenes
  showProductModal(product, images);
}

// Cargar productos al iniciar
document.addEventListener("DOMContentLoaded", loadProducts);
```

### Ejemplo 6: Subida múltiple de archivos con progreso

```javascript
async function uploadFiles(productId, files) {
  const formData = new FormData();

  // Agregar todos los archivos
  Array.from(files).forEach((file) => {
    formData.append("archivos", file);
  });

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/files/upload/multiple/${productId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log("Archivos subidos exitosamente:", result);
      return result;
    } else {
      throw new Error(result.message || "Error al subir archivos");
    }
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
}

// Uso con input de tipo file múltiple
const fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", async (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    try {
      await uploadFiles(1, files); // Reemplazar 1 con el ID del producto
      alert("Archivos subidos exitosamente!");
    } catch (error) {
      alert("Error al subir archivos: " + error.message);
    }
  }
});
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
