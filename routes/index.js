"use strict";

const { Router } = require("express");

const router = Router();

const Item = require("./../models/item");

const nodemailer = require("nodemailer");

require("dotenv").config();

router.get("/all", (req, res, next) => {
  Item.find({ resolved: false })
    .then(items => {
      res.json({ type: "success", data: { items } });
    })
    .catch(error => {
      next(error);
    });
});

router.post("/item/add", (req, res, next) => {
  const { title, description, itemStatus, imageUrl, user, postedBy } = req.body;

  Item.create({
    title,
    description,
    itemStatus,
    imageUrl,
    user,
    postedBy
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

router.post("/mailsent", (req, res, next) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS
    }
  });

  const message = `
    <h1>Good News!<h1>
    <h3>Your item has been spotted by someone!<h3>

    <h4>The following user:</h4>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li><strong>Email: ${req.body.email}</strong></li>
    </ul>

    <h4>Wrote Message: </h4>
    <p>
    ${req.body.message}
    </p>
  `;

  transporter
    .sendMail({
      from: '"Team Karmafy" <teamkarmafy@gmail.com>',
      to: "teamkarmafy@gmail.com",
      subject: "Your Karmafy item has been spotted!",
      html: `${message}`,
      text: message
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => console.log("MAIL SENDING FAILED", error));
});

router.get("/item/:id", (req, res, next) => {
  const id = req.params.id;
  Item.findById(id)
    .then(item => {
      res.json({ type: "success", data: { item } });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/byUser/:id", (req, res, next) => {
  const id = req.params.id;
  Item.find({ user: id })
    .then(item => {
      res.json({ type: "success", data: { item } });
    })
    .catch(error => {
      next(error);
    });
});

router.delete("/item/:id", (req, res, next) => {
  const id = req.params.id;
  Item.findOneAndUpdate({ _id: id }, { resolved: true })
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

router.get("/:type", (req, res, next) => {
  const typeItem = req.params;
  Item.find({ itemStatus: typeItem.type })
    .then(item => {
      res.json({ type: "success", data: { item } });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
