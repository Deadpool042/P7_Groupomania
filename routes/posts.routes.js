const router = require("express").Router();

const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer();

router.get("/", postController.getAllPosts); //Ok ca marche
router.post("/", upload.single("file"), postController.createPost); // Ok ca marche
router.put("/:id", postController.updatePost); // Ok ca marche

router.delete("/:id", postController.deletePost); //Ok ca marche
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

// comments
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/:id/edit-comment-post/:id", postController.editCommentPost);
router.patch("/:id/delete-comment-post/:id", postController.deleteCommentPost);

// //Upload
// router.post(
//   "/:id/upload",

//   postController.updatePost
// );

module.exports = router;
