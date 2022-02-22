import express from 'express';
import roleController from '../controllers/roleController.js';
import rv from '../middlewares/roleValidate.js';

//Se encarga de gestionar las peticiones http
const router = express.Router();
const existingRole = rv.existingRoleName;

//http://localhost:3001/api/role/resgisterRole
router.post("/registerRole", existingRole, roleController.registerRole);
router.get("/rolesList", roleController.getRolesList);;

export default router;