"use strict";

module.exports = (req, res, next) => {
  res.json({
    type: "JSON SENT FROM VERIFY CONTROLLER",
    user: {
      ...(req.user && { user: req.user })
    }
  });
};
