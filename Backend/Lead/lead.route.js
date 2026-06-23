import e from "express";
import {lesdCreate , getAll} from "./lead.controller.js"

const router = e.Router();

router.post('/lead' , lesdCreate);
router.get("/lead" , getAll);

export default router;