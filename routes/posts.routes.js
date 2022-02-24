const router = require("express").Router();
const { requireAuth } = require("../middlewares/auth.middleware"); // Protège les routes via postman ou autre similaire
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer();

router.get("/", postController.getAllPosts);
router.post("/", requireAuth, upload.single("file"), postController.createPost);
router.put("/:id", requireAuth, postController.updatePost);

router.delete("/:id", requireAuth, postController.deletePost);
router.patch("/like-post/:id", requireAuth, postController.likePost);
router.patch("/unlike-post/:id", requireAuth, postController.unlikePost);

// comments
router.patch("/comment-post/:id", requireAuth, postController.commentPost);
router.patch(
  "/:id/edit-comment-post/:id",
  requireAuth,
  postController.editCommentPost
);
router.patch(
  "/:id/delete-comment-post/:id",
  requireAuth,
  postController.deleteCommentPost
);

module.exports = router;
