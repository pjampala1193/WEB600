const express = require("express");
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");
const { requireAuth } = require("../middleware/Auth");

const router = express.Router();

// list
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  res.render("products/index", { products });
});

// new
router.get("/new", requireAuth, (req, res) => {
  res.render("products/new", { errors: [], form: {} });
});

router.post(
  "/",
  requireAuth,
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 120 }),
    body("description").trim().notEmpty().withMessage("Description is required").isLength({ max: 2000 }),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a number >= 0"),
    body("imageUrl").optional({ checkFalsy: true }).isURL().withMessage("Image URL must be a valid URL"),
    body("tags").optional({ checkFalsy: true }).trim()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const form = { ...req.body };

    if (!errors.isEmpty()) {
      return res.status(400).render("products/new", { errors: errors.array(), form });
    }

    const tags = (req.body.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      imageUrl: req.body.imageUrl || "",
      tags,
      authorId: req.session.user.id
    });

    res.redirect("/products");
  }
);

module.exports = router;
