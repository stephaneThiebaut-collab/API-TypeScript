import bcrypt from "bcrypt";
import mysql from 'mysql2';
import { executeQuery } from "../mysqlConnection";

async function passwordHash(password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            resolve(hashedPassword);
        } catch (error) {
            reject(error);
        }
    });
}

async function comparePasswordHash(email: string, password: string): Promise<boolean> {
    return new Promise (async (resolve, reject) => {
        try {
            const query = `SELECT * FROM employee WHERE email = ${mysql.escape(email)}`;
            const resultEmployee = await executeQuery(query);
            
            if (resultEmployee.length === 0) {
                reject(false);
            }
            const passwordEmployee = resultEmployee[0].password;
            const match = await bcrypt.compare(password, passwordEmployee);
            resolve(match)
            return match;
        } catch (error) {
            reject(error)
        }
    })
}

export { passwordHash, comparePasswordHash }