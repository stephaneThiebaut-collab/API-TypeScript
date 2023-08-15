import * as Joi from 'joi';
import { Request, Response, NextFunction } from "express";
import { EmployeeController } from "../controller/controllerEmployee";
import { AddEmployee } from '../middelware/mysqlConnection';

async function schemaAddEmployee(req: Request, res: Response): Promise<any> {
    try {
        const schemaTest = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            teams: Joi.string().required(),
        });

        const validationResult = schemaTest.validate(req.body);

        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.details });
        } else {
            // Si la validation réussit, appelez la prochaine fonction dans la chaîne (votre contrôleur, par exemple)
            const employee = new EmployeeController; 
            employee.create;
        }
    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue lors de la validation du schéma." });
    }
}

export { schemaAddEmployee };
