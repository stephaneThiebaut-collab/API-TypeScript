import { EmployeeInformation } from "../interface/interfaceMapping";
import { executeQuery } from "../mysqlConnection";
import mysql from 'mysql2';
import { error } from 'console';
import { comparePasswordHash, passwordHash } from "../bcryptPassword/password";
import { Controller } from "../../decorateur/controller";

@Controller()
class RequeteSqlEmployee {

    async  ConnectionEmployee(email: string, password: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const query = `SELECT * FROM employee WHERE email = ${mysql.escape(email)}`;
                const resultEmployee = await executeQuery(query);
                
                if (resultEmployee.length === 0) {
                    throw new Error('Aucun employé trouvé avec cet e-mail');
                }
                
                const passwordEmployee = resultEmployee[0].password;
                const result = await comparePasswordHash(password, passwordEmployee);
                if (result) {
                    resolve(resultEmployee)
                } else {
                    reject()
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    async  AddEmployee(firstName: string, lastName: string, email: string, teams: string, password: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const hashedPassword = await passwordHash(password);

                const employee = {
                    firstName: mysql.escape(firstName),
                    lastName: mysql.escape(lastName),
                    email: mysql.escape(email),
                    teams: mysql.escape(teams),
                    password: hashedPassword
                };

                const query = `INSERT INTO employee (firstName, lastName, email, teams, password) VALUES (${employee.firstName}, ${employee.lastName}, ${employee.email}, ${employee.teams}, ${mysql.escape(employee.password)})`;
                await executeQuery(query);

                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    async  selectOneEmployee(id: string): Promise<any> {
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

    async  updateOneEmployee(id: string, firstName: string, lastName: string, email: string, teams: string): Promise<void> {
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

    async  deleteOneEmployee(id: string): Promise<void> {
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
}

const requeteSqlEmployee = new RequeteSqlEmployee(); 

export { requeteSqlEmployee }