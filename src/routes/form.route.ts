import { Router } from "express"; 
import formController from "../controllers/form.controller";

const router = Router();

router.get('/', formController.getAllForms);
router.get('/getForm/:id', formController.getForm);
router.get('/getFormByUser/:idOwner', formController.getFormByUser);
router.post('/new',formController.newForm);
router.put('/update/:id', formController.updateForm);
router.delete('/delete/:id', formController.deleteForm);

export default router;