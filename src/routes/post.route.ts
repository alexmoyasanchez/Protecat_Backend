import { Router } from "express"; 
import postController from "../controllers/post.controller";

const router = Router();

router.get('/', postController.getAllPosts);
router.get('/getPost/:id', postController.getPost);
router.post('/new', postController.newPost);
router.put('/update/:id', postController.updatePost);
router.delete('/delete/:id', postController.deletePost);
router.put('/like/:idUser/:idPost', postController.giveLike);
router.put('/undoLike/:idUser/:idPost', postController.undoLike);
router.get('/checkLike/:idUser', postController.checkLike);

export default router;