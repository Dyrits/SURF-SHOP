const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('USERS');
});

router.get("/new", (req, res) => {
  res.send("NEW USER");
});

router.get("/:id", (req, res) => {
  res.send("USER");
});

router.post("/", (req, res) => {
  res.send("CREATE USER");
});

router.get("/:id/edit", (req, res) => {
  res.send("EDIT USER");
});

router.put("/:id", (req, res) => {
  res.send("UPDATE USER");
});

router.delete("/:id", (req, res) => {
  res.send("DELETE USER");
});

module.exports = router;
