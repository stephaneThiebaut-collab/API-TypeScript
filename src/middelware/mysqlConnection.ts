import mysql from 'mysql2';
import { config } from "dotenv";
import { Response } from "express";

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

    async function AddEmployee(firstName:string, lastName: string, email: string, teams: string){
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection(dbConfig);
            
            const employee = {
                firstName: mysql.escape(firstName), 
                lastName: mysql.escape(lastName), 
                email: mysql.escape(email), 
                teams: mysql.escape(teams)
            }

            const query = `INSERT INTO employee (firstName, lastName, email, teams) VALUES (${employee.firstName}, ${employee.lastName}, ${employee.email}, ${employee.teams})`;

            connection.execute(query, (error: any, result: Response) => {

            executeQuery(query);
                if (error) { return reject(error) } 
                else { resolve(result) }
                connection.end()
            })
        })
    }

    export { executeQuery, AddEmployee }