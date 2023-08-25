import { Controller } from "../decorateur/controller";
import { Get, Post } from "../decorateur/route";
import { requeteSqlTask } from "../middelware/requeteSql/requeteSqlTask";
import { tokenClass } from "../middelware/token/employeeToken";
import { schemaCreationTache } from "../schema/schemaTacheEmployee";
import { Response, Request } from 'express';


@Controller()
class TaskClass {

    @Post('creation-tache')
    async creationTache(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1]
        try {
            const tokenVerifier = await tokenClass.verificationToken(token);
            await schemaCreationTache(req, res);
            
            requeteSqlTask.creationTacheRequest(tokenVerifier?.id, req.body.assignerAquelEmployee, req.body.description)
                .then(() => { return res.status(201).json({message: 'La tache a bien été ajouter'}) })
                .catch((error) => { return res.status(500).json({message: 'Une erreur est survenue lors de la creation de la tache' + error}) })
        } catch (error) {
            return res.status(500).json({message: "Token invalid ou inactif!"})
        }

    }

    @Get('all-task')
    async getTaskByEmployee(req: Request, res: Response){
        const token = req.headers.authorization?.split(' ')[1]
        try {
            const tokenVerifier = await tokenClass.verificationToken(token);
            const id = tokenVerifier?.id;
            requeteSqlTask.selectAllTaskByEmployee(id)
                .then((result) => { return res.status(201).json(result) })
                .catch((error) => { return res.status(500).json({message: 'Une erreur est survenue' }) })
        } catch (error) {
            return res.status(500).json({message: "Token invalid ou inactif!"})
        }
    }
}

export { TaskClass }
