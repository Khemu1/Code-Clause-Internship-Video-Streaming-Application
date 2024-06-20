import { object, string } from "yup";
import path from "path";
import fs from "fs";

// https://stackoverflow.com/questions/73425133/transform-yup-validation-error-into-a-useable-object
/**
 * Transforms Yup errors into an object.
 * @param {ValidationError} errors - The Yup validation errors.
 * @returns {Record<string, string>} - An object containing the error messages.
 */
export const transformYupErrorsIntoObject = (errors) => {
  const validationErrors = {};

  errors.inner.forEach((error) => {
    if (error.path !== undefined) {
      validationErrors[error.path] = error.errors[0];
    }
  });

  return validationErrors;
};

export const validateUserSchema = object({
  email: string()
    .email("Please enter a valid email")
    .required("No Email provided")
    .label("Email"),
  username: string()
    .required("No user Name provided")
    .label("Username")
    .min(5, "Username is too short , it should be 5 chars  minimum"),
  password: string()
    .required("No passwrod provieded")
    .label("Password")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "Password should only contain Latin letters and Numbers."
    ),
});
export const validateLoginSchema = object({
  email: string()
    .email("Please enter a valid email")
    .required("No Email provided")
    .label("email"),
  password: string().required("No passwrod provieded").label("password"),
});

export const validateUpload = object({
  title: string()
    .required("Please Enter a Title For the Video")
    .max(100, "Only 50 max characters are allowed"),
  description: string().optional(),
  file: string().required("Video File Is Required"),
  thumb: string().optional(),
  radioGroup: string()
    .required("A radio option is required")
    .matches(/\b(public|private)\b/, "Please Try Again Later"),
});

export function formatDate(date) {
  const options = { month: "2-digit", day: "2-digit", year: "2-digit" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export async function cleanUpTempFiles() {
  const now = new Date();
  const cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  try {
    const oldFiles = await TempVideo.find({ createdAt: { $lt: cutoffTime } });
    for (const file of oldFiles) {
      const filePath = path.join(
        __dirname,
        "../../public/assets/temp",
        file.id
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${file.id}:`, err);
        } else {
          console.log(`Deleted file ${file.id}`);
        }
      });
      await TempVideo.deleteOne({ _id: file._id });
      console.log(`Deleted database entry for file ${file.id}`);
    }
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}
