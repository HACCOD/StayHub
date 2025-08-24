const User = require("../models/user.js");


module.exports.renderSignupForm = (req, res) => {
  res.render("./users/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ email, username });
      const registerUser = await User.register(newUser, password);
      //   as signup then auto login
      req.login(registerUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Wellcome to Wanderlust.");
        return res.redirect("/listings");
      });
    } catch (error) {
      req.flash("error", "User already exist.");
      res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
  res.render("./users/login.ejs");
}

module.exports.login =  (req, res) => {
    req.flash("success", "Wellcome back to wanderlust.");
    let redirect = res.locals.url || "/listings";
    res.redirect(redirect);
}

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "logged out!");
    res.redirect("/listings");
  });
}