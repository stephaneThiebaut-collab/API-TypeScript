import * as Joi from 'joi';
import { Request, Response, NextFunction } from "express";



async function schemaAddEmployee(req: Request, res: Response): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
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
                resolve();
            }
        } catch (error) {
            return res.status(500).json({ error: "Une erreur est survenue lors de la validation du schéma." });
        }
    });
}

async function schemaModifyEmployee(req: Request, res: Response): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const schemaModifyEmployee = Joi.object({
                firstName: Joi.string().required().allow(''),
                lastName: Joi.string().required().allow(''),
                email: Joi.string().required().allow(''),
                teams: Joi.string().required().allow(''),
            });

            const validationResult = schemaModifyEmployee.validate(req.body);

            if (validationResult.error) {
                return res.status(400).json({ error: validationResult.error.details });
            } else {
                resolve();
            }
        } catch (error) {
            return res.status(500).json({ error: "Une erreur est survenue lors de la validation du schéma." });
        }
    })
}

export { schemaAddEmployee, schemaModifyEmployee };
