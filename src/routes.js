var express = require("express");
var router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.send("Hello Latreta!");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect("/success");
  }
);

router.get("/failed", function (req, res) {
  res.sendStatus("Falha ao logar");
});

router.get("/success", function (req, res) {
  const { displayName, _json } = req.user;
  res.send(req.user);
});

module.exports = router;