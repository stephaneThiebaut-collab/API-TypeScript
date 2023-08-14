import { Response, Request } from "express";
import { Controller } from "../decorateur/controller";
import { Get } from "../decorateur/route";
import { createDbConnection } from "../middelware/mysqlConnection";


@Controller()
class EmployeeController {
    @Get()
    async getAll(req: Request, res: Response){
        const connection = await createDbConnection();
        try {
            const [rows, fields] = await connection.execute('SELECT * FROM employee');
            return res.status(201).json(rows)
        } catch (error) {
            return res.status(401).json({message: error})
        } finally {
            await connection.end();
        }
    }
}

const employee = new EmployeeController;

export { employee }