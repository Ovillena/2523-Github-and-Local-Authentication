const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin-dashboard", ensureAuthenticated, (req, res) => {
  //redirect to admin dashboard if user is an admin
  res.render("admin", {
    user: req.user,
    sessions: req.sessionStore.sessions,
  });
});

module.exports = router;
