const express = require("express");
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");
const { requireAuth } = require("../middleware/Auth");

const router = express.Router();

// list
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  res.render("posts/index", { posts });
});

// new
router.get("/new", requireAuth, (req, res) => {
  res.render("posts/new", { errors: [], form: {} });
});

router.post(
  "/",
  requireAuth,
  [
    body("title").trim().notEmpty().withMessage("Title is required").isLength({ max: 120 }),
    body("description").trim().notEmpty().withMessage("Description is required").isLength({ max: 2000 }),
    body("imageUrl").optional({ checkFalsy: true }).isURL().withMessage("Image URL must be a valid URL"),
    body("tags").optional({ checkFalsy: true }).trim()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const form = { ...req.body };

    if (!errors.isEmpty()) {
      return res.status(400).render("posts/new", { errors: errors.array(), form });
    }

    const tags = (req.body.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    await Post.create({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl || "",
      tags,
      authorId: req.session.user.id
    });

    res.redirect("/posts");
  }
);

module.exports = router;
