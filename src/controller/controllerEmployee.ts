import { Response, Request } from "express";
import { Controller } from "../decorateur/controller";
import { Get } from "../decorateur/route";
import { executeQuery } from "../middelware/mysqlConnection";


@Controller()
class EmployeeController {
    @Get("/")
    async getAll(req: Request, res: Response){
        executeQuery('SELECT * FROM employee')
        .then((results) => {
            return res.status(201).json(results);
        })
        .catch((error) =>{
            console.error('Error lors de la requete:', error);
            return res.status(401).json({message: 'Une erreur est survenue'})
        })
    }
}

export { EmployeeController }