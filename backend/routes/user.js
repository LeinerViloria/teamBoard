import express from 'express';
import userController from '../controllers/userController.js';
import uv from '../middlewares/userValidate.js';
import rv from '../middlewares/roleValidate.js';

const existingUser = uv.existingUser;
const existingRole = rv.existingRole;

const router = express.Router();

router.post("/registerUser", existingUser, existingRole, userController.registerUser);

router.get("/listUser/:name?", userController.listUser);
router.get("/listAllUsers/:name?", userController.listUserAdmin);

router.post("/login", userController.login);

// router.delete("/delete/:_id", userController.deleteUser);
router.put("/delete/:_id", userController.deleteUser);

router.put("/updateUserAdmin", userController.updateUserByAdmin);

export default router;
