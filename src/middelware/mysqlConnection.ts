import mysql from 'mysql2';
import { config } from "dotenv";
import { Response, query } from "express";

config();

const dbConfig = {
    host: process.env.HOST_DB,
    user: process.env.DB_USER,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_OF_DB
}

    function executeQuery(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection(dbConfig);

            connection.query(query, (error: any, result: Response) => {
                if (error) { return reject(error) } 
                else { resolve(result) }
                connection.end()
            })
        })
    }

    

    export { executeQuery }