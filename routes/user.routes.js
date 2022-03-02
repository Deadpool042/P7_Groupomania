const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

const multer = require("multer");

const upload = multer();

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", requireAuth, authController.logout);

//User db
router.get("/", requireAuth, userController.getAllUsers);
router.get("/:id", requireAuth, userController.userInfo);
router.put("/:id", requireAuth, userController.updateUser);
router.delete("/:id", requireAuth, userController.deleteUser);

//Upload
router.post(
  "/upload",
  upload.single("file"),
  requireAuth,
  uploadController.uploadProfil
);

module.exports = router;
