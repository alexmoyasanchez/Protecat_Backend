import { Router } from "express"; 
import objectController from "../controllers/object.controller";
import { isAdmin } from "../middelware/authJWT";

const router = Router();

router.get('/', objectController.getAllObjects);
router.get('/getObject/:id', objectController.getObject);
router.get('/getObjectByName/:name', objectController.getObjectByName);
router.post('/new/:userId', [isAdmin], objectController.newObject);
router.put('/update/:id/:userId', [isAdmin], objectController.updateObject);
router.delete('/delete/:id/:userId', [isAdmin], objectController.deleteObject);
router.put('/subUnit/:id/:userId', [isAdmin], objectController.subUnit);
router.put('/addUnit/:id/:userId', [isAdmin], objectController.addUnit);

export default router;