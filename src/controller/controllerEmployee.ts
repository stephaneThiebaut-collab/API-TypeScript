import { Response, Request, NextFunction } from 'express';
import { Controller } from "../decorateur/controller";
import { Get, Post } from "../decorateur/route";
import { AddEmployee, executeQuery, selectOneEmployee } from "../middelware/mysqlConnection";
import { schemaAddEmployee } from "../schema/addEmployee";


@Controller()
class EmployeeController {
    @Get("get-all")
    async getAll(req: Request, res: Response){
        executeQuery('SELECT * FROM employee')
            .then((results) => { return res.status(201).json(results); })
            .catch((error) =>{ return res.status(401).json({message: 'Une erreur est survenue'}) })
    }

    @Post("create-employee")
    async create(req: Request, res: Response) {
        try {
            await schemaAddEmployee(req, res)
            .then(() => {
                AddEmployee(req.body.firstName, req.body.lastName, req.body.email, req.body.teams)
                    .then(() => { return res.status(201).json({message: "Employée ajouté avec success!"}) })
                    .catch((error) => { return res.status(401).json({message: `Une erreur est survenue ${error}`}) })
            })
            .catch((error) => { return res.status(401).json({message: `Une erreur est survenue ${error}`}) })
        } catch (error) {
            return res.status(500).json({ error: `Une erreur est survenue lors de la création de l'employé: ${error}` });
        }
    }

    @Get("get-one/:id")
    async oneEmployee(req: Request, res: Response){
        selectOneEmployee(req.params.id)
            .then((result) => {
                if (result.length === 0) {
                    return res.status(401).json({message: `L'employee n'existe pas!`})
                }
                return res.status(201).json(result) 
            })
            .catch((error) => { return res.status(401).json({message: `Une erreur est survenue ${error}`}) })
    }

}

export { EmployeeController }