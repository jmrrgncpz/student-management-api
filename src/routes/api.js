import express from "express";

import { validate } from "express-validation";

import * as apiController from "../controllers/api.controller";
import * as apiValidator from "../controllers/api.validator";

const router = express.Router();

// api/register
router.post("/register", validate(apiValidator.register, { keyByField: true }), apiController.register);

// api/getcommonsstudents
router.get("/getcommonsstudents", validate(apiValidator.getCommonsStudents, { keyByField: true }), apiController.getCommonsStudents)

// api/suspend
router.post("/suspend", validate(apiValidator.suspend, { keyByField: true }), apiController.suspend)

// api/receivenotifications
router.post("/receivenotifications", validate(apiValidator.receiveNotifications, { keyByField: true }), apiController.receiveNotifications)

module.exports = router;
