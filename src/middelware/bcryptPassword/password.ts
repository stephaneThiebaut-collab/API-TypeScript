import bcrypt from "bcrypt";
import mysql from 'mysql2';
import { executeQuery } from "../mysqlConnection";

async function passwordHash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function comparePasswordHash(email: string, password: string): Promise<boolean> {
    try {
        const query = `SELECT * FROM employee WHERE email = ${mysql.escape(email)}`;
        const resultEmployee = await executeQuery(query);
        
        if (resultEmployee.length === 0) {
            throw new Error('Aucun employé trouvé avec cet e-mail');
        }
        
        const passwordEmployee = resultEmployee[0].password;
        const match = await bcrypt.compare(password, passwordEmployee);
        return match;
    } catch (error) {
        throw error;
    }
}

export { passwordHash, comparePasswordHash };
