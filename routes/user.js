const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { redirectURL } = require("../middleware.js");
const userControllers = require("../controllers/users.js");
const { route } = require("./listing.js");

router
  .route("/signup")
  .get(userControllers.renderSignupForm)
  .post(wrapAsync(userControllers.signup));

router
  .route("/login")
  .get(userControllers.renderLoginForm)
  .post(
    redirectURL,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userControllers.login
  );

router.get("/logout", userControllers.logout);

//google auth
// Redirect to Google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback from Google
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/signup",
    failureFlash: true,
  }),
  function (req, res) {
    console.log("authenticate successfully");
    res.redirect("/listings");
  }
);

module.exports = router;
