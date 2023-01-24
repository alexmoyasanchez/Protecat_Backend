import { Router } from "express"; 
import userController from "../controllers/user.controller";
import { isAdmin } from "../middelware/authJWT";

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/getUser/:id', userController.getUser);
router.get('/getUserByEmail/:email', userController.getUserByEmail);
router.get('/getUserByUsername/:username', userController.getUserByUsername);
router.get('/getUserById/:id', userController.getUser);
router.post('/new/:userId', userController.newUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id/:userId', [isAdmin], userController.deleteUser);
router.post('/login', userController.LogIn);
router.get('/getTasks/:id', userController.getTasks);
router.put('/addPermission/:id/:userId', [isAdmin], userController.addPermission);


export default router;