require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const methodOverride = require("method-override");
const morgan = require("morgan");
const helmet = require("helmet");

const authRoutes = require("./src/routes/auth");
const postRoutes = require("./src/routes/posts");
const productRoutes = require("./src/routes/products");

const app = express();

// ---- DB ----
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// ---- View engine ----
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// ---- Middleware ----
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "src/public")));

// ---- Sessions ----
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax" },
    store: new MongoStore({ mongoUrl: process.env.MONGODB_URI })
  })
);

// Make user available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// ---- Routes ----
app.get("/", (req, res) => res.redirect("/posts"));

app.use(authRoutes);
app.use("/posts", postRoutes);
app.use("/products", productRoutes);

// ---- 404 ----
app.use((req, res) => {
  res.status(404).render("404");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
