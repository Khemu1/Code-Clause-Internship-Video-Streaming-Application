import {
  transformYupErrorsIntoObject,
  validateUserSchema,
  validateLoginSchema,
} from "../utils/utils.js";

export async function validateUser(req, res, next) {
  try {
    const data = await validateUserSchema.validate(
      {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      },
      { abortEarly: false }
    );
    req.validatedData = data; 
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ errors: transformYupErrorsIntoObject(error) });
  }
}

export async function validateLogin(req, res, next) {
  try {
    const data = await validateLoginSchema.validate(
      {
        email: req.body.email,
        password: req.body.password,
      },
      { abortEarly: false }
    );
    req.validatedData = data;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ errors: transformYupErrorsIntoObject(error) });
  }
}
