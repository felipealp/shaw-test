import { Router } from "express";
import { uploadFile, findData } from "../app/controllers/Controller.ts";

const routes = Router();

// Upload CSV file
routes.post("/files", uploadFile);
// Find users
routes.get("/users", findData);

export default routes;