import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT, RAIZ } from "./config/config.js";
import { sequelize } from './model/index.model.js'
import allRouter from "./routes/index.routes.js";

const app = express();


app.use(cors({ origin: ["*"] }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan("dev"));


app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API funcionando correctamente 🎉',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

app.use(RAIZ, allRouter);

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(PORT, () => {
            console.log(`App funcionando en http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();
