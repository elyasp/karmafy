"use strict";

const { Router } = require("express");
const router = Router();

const routeGuardMiddleware = require("./../middleware/route-guard");

const registerController = require("./../controllers/auth/register");
const logInController = require("./../controllers/auth/login");

router.post("/register", routeGuardMiddleware(false), registerController);
router.post("/login", routeGuardMiddleware(false), logInController);

module.exports = router;
