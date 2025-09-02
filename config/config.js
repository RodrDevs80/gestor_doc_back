import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const PORT = process.env.PORT ?? 3000;
export const RAIZ = process.env.RAIZ;


const database = process.env.DATABASE;
const username = process.env.NAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dialect = process.env.DIALECT;
const db_port = process.env.DB_PORT;




export const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    port: db_port,
    logging: false /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});