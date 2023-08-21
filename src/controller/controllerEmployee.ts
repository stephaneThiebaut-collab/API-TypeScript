import { Response, Request } from 'express';
import { Controller } from "../decorateur/controller";
import { Delete, Get, Post, Put } from "../decorateur/route";
import { executeQuery } from "../middelware/mysqlConnection";
import { AddEmployee,  selectOneEmployee, updateOneEmployee, deleteOneEmployee, functionConnectionEmployee, creationTacheRequest } from "../middelware/requeteSqlEmployee";
import { schemaAddEmployee, schemaConnectionEmployee, schemaModifyEmployee } from "../schema/schemaEmployee";
import { generateToken, verificationToken } from '../middelware/token/employeeToken';
import { schemaCreationTache } from '../schema/schemaTacheEmployee';


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
            await schemaAddEmployee(req, res);
            AddEmployee(req.body.firstName, req.body.lastName, req.body.email, req.body.teams, req.body.password)
                .then(() => { return res.status(201).json({message: "Employée ajouté avec success!"}) })
                .catch(() => { return res.status(401).json({message: `Une erreur est survenue`}) })
        } catch (error) {
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

        try {
            await schemaConnectionEmployee(req, res);

            const result = await functionConnectionEmployee(req.body.email, req.body.password);
            const id = result[0].id

            if (!result) {
                return res.status(401).json({ message: "L'un de vos identifiants n'est pas valide" });
            }

            const token = await generateToken(id);
            return res.status(201).json({ message: "Vous êtes connecté", token: token });
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            return res.status(500).json({ message: "Une erreur est survenue lors de la connexion" });
        }
    }

    @Post('creation-tache')
    async creationTache(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1]
        try {
            const tokenVerifier = await verificationToken(token);
            await schemaCreationTache(req, res);
            
            creationTacheRequest(tokenVerifier?.id, req.body.assignerAquelEmployee, req.body.description)
                .then(() => { return res.status(201).json({message: 'La tache a bien été ajouter'}) })
                .catch((error) => { return res.status(500).json({message: 'Une erreur est survenue lors de la creation de la tache' + error}) })
        } catch (error) {
            return res.status(500).json({message: "Token invalid ou inactif!"})
        }

    }
}

export { EmployeeController }