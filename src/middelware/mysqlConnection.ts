import mysql from 'mysql2/promise';
import { config } from "dotenv";
config();

export async function createDbConnection() {
    const connection = await mysql.createConnection({
        host: process.env.HOST_DB,
        user: process.env.DB_USER,
        password: process.env.PASSWORD_DB,
        database: process.env.NAME_OF_DB
    });
    return connection;
}

