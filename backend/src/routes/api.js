const { Router } = require("express");
const blogController = require("../controllers/blogController");

const router = Router();

router.get("/", blogController.getAllPosts);
router.get("/:id", blogController.getPostById);
router.post("/", blogController.addPost);
router.put("/:id", blogController.updatePost);
router.delete("/:id", blogController.removePost);

module.exports = router;
