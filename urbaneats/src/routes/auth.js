const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// signup
router.get("/signup", (req, res) => res.render("auth/signup", { errors: [], form: {} }));

router.post(
  "/signup",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const form = { name: req.body.name, email: req.body.email };

    if (!errors.isEmpty()) {
      return res.status(400).render("auth/signup", { errors: errors.array(), form });
    }

    try {
      const existing = await User.findOne({ email: req.body.email.toLowerCase() });
      if (existing) {
        return res.status(400).render("auth/signup", {
          errors: [{ msg: "Email is already registered" }],
          form
        });
      }

      const passwordHash = await bcrypt.hash(req.body.password, 12);
      const user = await User.create({ name: req.body.name, email: req.body.email, passwordHash });

      req.session.user = { id: user._id.toString(), name: user.name, email: user.email };
      res.redirect("/posts");
    } catch (e) {
      console.error(e);
      res.status(500).render("auth/signup", { errors: [{ msg: "Server error" }], form });
    }
  }
);

// login
router.get("/login", (req, res) => res.render("auth/login", { errors: [], form: {} }));

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const form = { email: req.body.email };

    if (!errors.isEmpty()) {
      return res.status(400).render("auth/login", { errors: errors.array(), form });
    }

    try {
      const user = await User.findOne({ email: req.body.email.toLowerCase() });
      if (!user) {
        return res.status(401).render("auth/login", { errors: [{ msg: "Invalid login" }], form });
      }

      const ok = await bcrypt.compare(req.body.password, user.passwordHash);
      if (!ok) {
        return res.status(401).render("auth/login", { errors: [{ msg: "Invalid login" }], form });
      }

      req.session.user = { id: user._id.toString(), name: user.name, email: user.email };
      res.redirect("/posts");
    } catch (e) {
      console.error(e);
      res.status(500).render("auth/login", { errors: [{ msg: "Server error" }], form });
    }
  }
);

// logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
});

module.exports = router;
