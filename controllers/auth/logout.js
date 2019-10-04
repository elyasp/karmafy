"use strict";

module.exports = (req, res, next) => {
  console.log("hello from logout controller");
  req.session.destroy();
  res.json({ message: "USER LOGGED OUT" });
};
