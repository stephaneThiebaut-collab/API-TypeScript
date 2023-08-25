import { executeQuery } from "../mysqlConnection";
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2';
import { error } from "console";
import { Controller } from "../../decorateur/controller";

@Controller()
class RequeteSqlTask {
    async creationTacheRequest(id:any, assignerAquelEmployee: number, description: string): Promise<void> {
        return new Promise(async (resolve, rejects) => {
            const query = `SELECT * FROM employee WHERE id = ${id}`;
            try {
                const result = await executeQuery(query);
                if (result.length === 0) {
                    rejects(error);
                }
                if (result[0].admin === 1) {
                    const tache = {
                        assignerAquelEmployee: mysql.escape(assignerAquelEmployee),
                        description: mysql.escape(description)
                    }
                    const newTache = `INSERT INTO tacheEmployee(uuid, assignerAquelEmployee, description) VALUES ('${uuidv4()}', ${tache.assignerAquelEmployee}, ${tache.description})`;
                    const insertTache = await executeQuery(newTache);
                    resolve(insertTache)
                } else {
                    rejects(error)
                }
            } catch (error) {
                rejects(error)
            }
        })
    }

    async selectAllTaskByEmployee(id: unknown): Promise<void>{
        return new Promise(async(resolve, reject) => {
            const query = `SELECT * FROM tacheemployee WHERE assignerAquelEmployee = ${mysql.escape(id)} `;
            console.log(query)
            try{
                const result = await executeQuery(query);
                resolve(result)
            } catch(error){
                reject(error)
            }
        })
    }
}

const requeteSqlTask = new RequeteSqlTask();

export { requeteSqlTask };