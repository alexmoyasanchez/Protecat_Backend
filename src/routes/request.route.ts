import { Router } from "express"; 
import requestController from "../controllers/request.controller";

const router = Router();

router.get('/', requestController.getAllRequests);
router.get('/getRequest/:id', requestController.getRequest);
router.get('/getRequestByUser/:idOwner', requestController.getRequestByUser);
router.get('/getRequestByCat/:idOwner', requestController.getRequestByCat);
router.post('/new',requestController.newRequest);
router.put('/update/:id', requestController.updateRequest);
router.delete('/delete/:id', requestController.deleteRequest);

export default router;