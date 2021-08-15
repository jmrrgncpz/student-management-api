import { Joi } from "express-validation";

export const register = {
  body: Joi.object({
    tutor: Joi.string().email().required(),
    students: Joi.array().items(Joi.string().email()).required().min(1),
  }),
};

export const getCommonsStudents = {
  query: Joi.object({
    tutor: Joi.alternatives().try(
      Joi.string().email(), 
      Joi.array().items(Joi.string().email()).min(1)
      ).required()
  })
}