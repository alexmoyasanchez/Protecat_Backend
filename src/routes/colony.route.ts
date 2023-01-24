import { Router } from "express"; 
import colonyController from "../controllers/colony.controller";
import { isAdmin, verifyToken } from "../middelware/authJWT";

const router = Router();

router.get('/:userId', colonyController.getAllColonies);
router.get('/getColony/:id', colonyController.getColony);
router.get('/getColonyByName/:name', colonyController.getColonyByName);
router.post('/new/:userId', [isAdmin], colonyController.newColony);
router.put('/update/:id/:userId', [isAdmin], colonyController.updateColony);
router.put('/addCat/:id/:cat/:userId', [isAdmin], colonyController.addCat);
router.delete('/delete/:id/:userId', [isAdmin], colonyController.deleteColony);
router.put('/removeCatOfColony/:id/:idCat/:userId', [isAdmin], colonyController.removeCatOfColony);

export default router;