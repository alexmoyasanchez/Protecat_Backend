import { Router } from "express"; 
import catController from "../controllers/cat.controller";
import { isAdmin, verifyToken } from "../middelware/authJWT";

const router = Router();

router.get('/', catController.getAllCats);
router.get('/getCat/:id', catController.getCat);
router.get('/getCatByName/:name', catController.getCatByName);
router.post('/new/:userId', [isAdmin], catController.newCat);
router.put('/update/:id/:userId', [isAdmin], catController.updateCat);
router.delete('/delete/:id/:userId', [isAdmin], catController.deleteCat);

export default router;