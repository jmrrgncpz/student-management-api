import express from "express";

import { validate } from "express-validation";

import * as apiController from "../controllers/api.controller";
import * as apiValidator from "../controllers/api.validator";

const router = express.Router();

// api/register
// could be named /tutor-student instead as nouns are best representation of a rest resources
// VERBS such as "register" are more applicable to RPC protocol
// HTTP method should enough to know what the endpoint will do
router.post("/register", validate(apiValidator.register, { keyByField: true }), apiController.register);
// api/getcommonsstudents
// could be named /commons-students instead to comply on rest resources best practice
router.get("/getcommonsstudents", validate(apiValidator.getCommonsStudents, { keyByField: true }), apiController.getCommonsStudents)

module.exports = router;
