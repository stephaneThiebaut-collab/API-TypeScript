import { Response, Request, NextFunction } from 'express';
import { Controller } from "../decorateur/controller";
import { Delete, Get, Post, Put } from "../decorateur/route";
import { executeQuery } from "../middelware/mysqlConnection";
import { AddEmployee,  selectOneEmployee, updateOneEmployee, deleteOneEmployee, functionConnectionEmployee} from "../middelware/requeteSqlEmployee";
import { schemaAddEmployee, schemaConnectionEmployee, schemaModifyEmployee } from "../schema/schemaEmployee";
import jwt from "jsonwebtoken";
import { generateToken } from '../middelware/token/employeeToken';




@Controller()
class EmployeeController {
    @Get("get-all")
    async getAll(req: Request, res: Response){
        executeQuery('SELECT * FROM employee')
            .then((results) => { return res.status(201).json(results); })
            .catch(() =>{ return res.status(401).json({message: 'Une erreur est survenue'}) })
    }

    @Post("create-employee")
    async create(req: Request, res: Response) {
        try {
            await schemaAddEmployee(req, res)
            .then(() => {
                AddEmployee(req.body.firstName, req.body.lastName, req.body.email, req.body.teams, req.body.password)
                    .then(() => { return res.status(201).json({message: "Employée ajouté avec success!"}) })
                    .catch(() => { return res.status(401).json({message: `Une erreur est survenue`}) })
            })
            .catch(() => { return res.status(401).json({message: `Une erreur est survenue`}) })
        } catch  {
            return res.status(500).json({ message: `Une erreur est survenue lors de la création de l'employé` });
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
            .catch(() => { return res.status(401).json({message: `Une erreur est survenue`}) })
    }

    @Put('modify-employee/:id')
    async modifyOneEmployee(req: Request, res: Response){
        try { 
            await schemaModifyEmployee(req, res)
            .then(() => {
                updateOneEmployee(req.params.id, req.body.firstName, req.body.lastName, req.body.email, req.body.teams)
                    .then(() => { res.status(201).json({message: "L'employee a été modifié avec success!"}) })
                    .catch(() => { return res.status(401).json({message: `Une erreur est survenue`}) })
            })
            .catch(() => { return res.status(401).json({message: `Une erreur est survenue`}) })
        } catch {
            return res.status(401).json({message: `Une erreur est survenue lors de la modification de l'employee`})
        }
    }

    @Delete('delete-employee/:id')
    async deleteOneEmployee(req: Request, res: Response){
        deleteOneEmployee(req.params.id)
            .then(() => { res.status(201).json({message: "L'employee a été supprimé avec success!"}) })
            .catch(() => { return res.status(401).json({message: `Une erreur est survenue`}) })
    }

    @Post('connection')
    async connectionEmployee(req: Request, res: Response){

        schemaConnectionEmployee(req, res)
            .then(() => {
                functionConnectionEmployee(req.body.email, req.body.password)
                    .then(() => {
                        generateToken()
                        .then((token) => {
                            return res.status(201).json({message: "Vous etes connecter", token: token})
                        })
                        .catch(() => {
                            return res.status(401).json({message: "Une erreur est survenue lors de la generation de token"})
                        })
                    })
                    .catch(() => {
                        return res.status(401).json({message: "L'un de vos identifiant n'est pas valide"})
                    })
            })
            .catch(() => {
                return res.status(401).json({message: "Une erreur est survenue"})
            })
    }
}

export { EmployeeController }