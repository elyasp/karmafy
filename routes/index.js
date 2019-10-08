"use strict";

const { Router } = require("express");

const router = Router();

const Item = require("./../models/item");

router.get("/all", (req, res, next) => {
  Item.find()
    .then(items => {
      res.json({ type: "success", data: { items } });
    })
    .catch(error => {
      next(error);
    });
});

router.post("/item/add", (req, res, next) => {
  const { title, description, itemStatus, imageUrl, user } = req.body;

  Item.create({
    title,
    description,
    itemStatus,
    imageUrl,
    user
  })
    .then(item => {
      res.json({ type: "success", data: { item } });
    })
    .catch(error => {
      next(error);
    });
});

router.patch("/item/:id/edit", (req, res, next) => {
  const id = req.params.id;
  const { title, description } = req.body;
  console.log("whole", req.body);
  Item.findOneAndUpdate(
    {
      _id: id
    },
    {
      ...(title && { title }),
      ...(description && { description })
    },
    { new: true }
  )
    .then(item => {
      if (item) {
        res.json({ type: "success", data: { item } });
      } else {
        next(new Error("POST_COULD_NOT_BE_EDITED"));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.delete("/item/:id/delete", (req, res, next) => {
  const id = req.params.id;
  Item.findOneAndDelete({
    id: id
  })
    .then(item => {
      if (item) {
        res.json({ type: "success" });
      } else {
        next(new Error("ITEM_COULD_NOT_BE_DELETED"));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get("/item/:id", (req, res, next) => {
  const id = req.params.id;
  Item.findById(id)
    // .populate("user")
    .then(item => {
      res.json({ type: "success", data: { item } });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
