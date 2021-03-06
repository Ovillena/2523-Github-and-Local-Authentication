module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    if (req.user.isAdmin === true) {
      res.redirect("/admin-dashboard"); //if req.user has a property of isAdmin that is set to true, then redirects to admin dashboard
    } else {
      // Successful authentication, redirect home.
      res.redirect("/dashboard");
    }
  },
};
