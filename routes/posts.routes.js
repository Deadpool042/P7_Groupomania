const router = require("express").Router();
const { requireAuth } = require("../middlewares/auth.middleware");
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer();

router.get("/", postController.getAllPosts); //Ok ca marche
router.post("/", requireAuth, upload.single("file"), postController.createPost); // Ok ca marche
router.put("/:id", requireAuth, postController.updatePost); // Ok ca marche

router.delete("/:id", requireAuth, postController.deletePost); //Ok ca marche
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
