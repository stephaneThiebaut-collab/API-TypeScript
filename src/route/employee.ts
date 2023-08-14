// routes/employeeRoutes.ts
import { Router, Request, Response } from "express";
import { employee } from "../controller/controllerEmployee";

const router = Router();

router.get("/", (req, res) => {employee.getAll(req, res)});

export default router;
