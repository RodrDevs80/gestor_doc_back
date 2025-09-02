import multer from "multer";
import fs from "node:fs";
import path from "node:path";


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, `uploads/productos/${req.params.idProducto || 'temp'}`);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const uploadDir = `uploads/productos/${req.params.idProducto || 'temp'}`;

            // Crear directorio si no existe
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            cb(null, uploadDir);
        } catch (error) {
            cb(error, null);
        }
    },
    filename: (req, file, cb) => {
        try {

            const fileExt = path.extname(file.originalname).toLowerCase();

            const timestamp = Date.now();
            const randomStr = Math.random().toString(36).substring(2, 8);
            const filename = `${timestamp}-${randomStr}${fileExt}`;

            cb(null, filename);
        } catch (error) {
            cb(error, null);
        }
    }
});


const upload = multer({ storage });
export { upload };

