"use strict";

const { Router } = require("express");
const router = Router();

router.get("/", (req, res, next) => {
  res.json({ type: "success", data: { title: "Hello World" } });
});

module.exports = router;
