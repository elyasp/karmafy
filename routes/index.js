"use strict";

const { Router } = require("express");

const router = Router();

const Item = require("./../models/item");
const User = require("./../models/user");

const nodemailer = require("nodemailer");

require("dotenv").config();

router.get("/all", (req, res, next) => {
  Item.find({ resolved: false })
    .populate("user")
    .then(items => {
      res.json({ type: "success", data: { items } });
    })
    .catch(error => {
      next(error);
    });
});

router.post("/item/add", (req, res, next) => {
  const {
    title,
    description,
    itemStatus,
    imageUrl,
    location,
    ownerCheck
  } = req.body;

  Item.create({
    title,
    description,
    ownerCheck,
    itemStatus,
    imageUrl,
    user: req.user._id,
    location
  })
    .then(item => {
      res.json({ type: "success", data: { item } });
      console.log("DURING CREATION", item);
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
      <h3>Your have a new message from user: <strong>${
        req.body.name
      }</strong><h3>
  
      <h4>Contact Details:</h4>
      <ul>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.contactnumber}</li>
      </ul>

      ${
        req.body.verifQuestion
          ? `


            <strong>
              <h5>Your verification question: ${req.body.verifQuestion}</h5>
              <h6>Answer: ${req.body.ownerCheckAns}</h6>
            </strong>
            
            `
          : ""
      }
  
      <h4>Wrote Message: </h4>
      <p><i>${req.body.message}</i></p>
      
    `;

  transporter
    .sendMail({
      from: '"Team Karmafy" <teamkarmafy@gmail.com>',
      to: `${req.body.receiver}`,
      subject: "Your Karmafy item has been spotted!",
      html: `${message}`,
      text: message
    })
    .then(result => {
      res.json({ type: "success", result });
    })
    .catch(error => console.log("MAIL SENDING FAILED", error));
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

router.get("/item/:id", (req, res, next) => {
  const id = req.params.id;
  Item.findById(id)
    .populate("user")
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

router.post("/item/:id", (req, res, next) => {
  const id = req.params.id;
  const userId = req.body.userId;
  const karma = req.body.karmaNum;
  Promise.all([
    User.findOneAndUpdate({ _id: userId }, { karmaCount: karma }),
    Item.findOneAndUpdate({ _id: id }, { resolved: true })
  ])
    .then(item => {
      if (item) {
        res.json({ type: "success", data: { item } });
        console.log("is this it", item);
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
