// routes/auth.js
// this file handles login with Google, GitHub and logout

const express = require("express");
const passport = require("passport");

const router = express.Router();

// ================= GOOGLE AUTH =================

// start Google login
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback URL
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // login success -> go to assignments page
    res.redirect("/assignments");
  }
);

// ================= GITHUB AUTH =================

// start GitHub login
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback URL
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    // login success -> go to assignments page
    res.redirect("/assignments");
  }
);

// ================= LOGOUT =================

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
