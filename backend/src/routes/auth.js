const express = require("express");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { join, login, logout } = require("../controllers/auth");

const router = express.Router();

// POST /auth/join
router.post("/join", isNotLoggedIn, join);

// POST /auth/login
router.post("/login", isNotLoggedIn, login);

// GET /auth/logout
router.get("/logout", isLoggedIn, logout);

// GET /auth/naver
router.get("/naver", passport.authenticate("naver"));

// GET /auth/naver/callback
router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: "/?error=네이버로그인 실패",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
