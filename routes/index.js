"use strict";

const { Router } = require("express");

const router = Router();

const Item = require("./../models/item");

router.post("/item/add", (req, res, next) => {
  const { title, description, itemStatus } = req.body;
  console.log(title);
  Item.create({
    title,
    description,
    itemStatus
  })
    .then(item => {
      res.json({ type: "success", data: { item } });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
