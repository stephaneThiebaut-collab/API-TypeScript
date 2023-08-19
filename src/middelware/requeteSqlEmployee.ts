import { EmployeeInformation } from "./interface/interfaceMapEmployee";
import { executeQuery } from "./mysqlConnection";
import mysql from 'mysql2';
import { error } from 'console';

async function AddEmployee(firstName: string, lastName: string, email: string, teams: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        const employee = {
            firstName: mysql.escape(firstName),
            lastName: mysql.escape(lastName),
            email: mysql.escape(email),
            teams: mysql.escape(teams)
        }
        const query = `INSERT INTO employee (firstName, lastName, email, teams) VALUES (${employee.firstName}, ${employee.lastName}, ${employee.email}, ${employee.teams})`;
        try {
            await executeQuery(query);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

async function selectOneEmployee(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        const query = `SELECT * FROM employee WHERE id = ${id}`;
        try {
            const result = await executeQuery(query);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

async function updateOneEmployee(id: string, firstName: string, lastName: string, email: string, teams: string): Promise<any> {
    return new Promise(async (resolve, rejects) => {
        const select = `SELECT * FROM employee WHERE id = ${id}`;
        try {
            const resultSelect = await executeQuery(select)
            if (resultSelect.length === 0) {
                rejects(error)
            }
            if (mysql.escape(firstName) === "''") { firstName = resultSelect.map((obj: EmployeeInformation) => obj.firstName)[0]; }
            if (mysql.escape(lastName) === "''") { lastName = resultSelect.map((obj: EmployeeInformation) => obj.lastName)[0]; }
            if (mysql.escape(email) === "''") { email = resultSelect.map((obj: EmployeeInformation) => obj.email)[0]; }
            if (mysql.escape(teams) === "''") { teams = resultSelect.map((obj: EmployeeInformation) => obj.teams)[0]; }
            
            const update = `UPDATE employee SET firstName = ${mysql.escape(firstName)}, lastName = ${mysql.escape(lastName)}, email = ${mysql.escape(email)}, teams = ${mysql.escape(teams)} WHERE id = ${id}`;
            const resultUpdate = await executeQuery(update)
            resolve(resultUpdate)
        } catch {
            rejects(error)
        }
    })
}

async function deleteOneEmployee(id: string): Promise<any> {
    return new Promise(async (resolve, rejects) => {
        const query = `SELECT * FROM employee WHERE id = ${id}`;
        try {
            const result = await executeQuery(query);
            if (result.length === 0) {
                rejects(error)
            }

            const deleteEmployee = `DELETE FROM employee WHERE id = ${id}`;
            const resultDeleteEmployee = await executeQuery(deleteEmployee);

            resolve(resultDeleteEmployee);
        } catch (error) {
            rejects(error)
        }
    })
}

export { AddEmployee, selectOneEmployee, updateOneEmployee, deleteOneEmployee }