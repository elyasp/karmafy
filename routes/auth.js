"use strict";

const { Router } = require("express");
const router = Router();
const upload = require("./../utilities/cloudinary");

const routeGuardMiddleware = require("./../middleware/route-guard");

const registerController = require("./../controllers/auth/register");
const logInController = require("./../controllers/auth/login");
const logOutController = require("./../controllers/auth/logout");
const verifyController = require("./../controllers/auth/verify");
const loadUserController = require("./../controllers/auth/loadUser");
const editUserController = require("./../controllers/auth/editUser");
const deleteUserController = require("./../controllers/auth/deleteUser");

router.post("/register", routeGuardMiddleware(false), registerController);
router.post("/login", routeGuardMiddleware(false), logInController);
router.post("/logout", routeGuardMiddleware(true), logOutController);
router.get("/verify", verifyController);
router.get("/user/:name", loadUserController);
router.patch(
  "/user/:name/edit",
  routeGuardMiddleware(true),
  editUserController
);
router.delete("/user/:name", routeGuardMiddleware(true), deleteUserController);
router.post("/upload", upload.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("UPLOAD FAILED"));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

module.exports = router;
