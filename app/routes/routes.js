import express from "express";
import bodyParser from "body-parser";
import {
  processUpload,
  revertUpload,
  submit,
} from "../controllers/uploadController.js";
import {
  publicVideos,
  userVideos,
  loadVideo,
  incrementViewCount,
} from "../controllers/videoController.js";
import { uploadTemp, upload } from "../middlewares/uploadMiddleware.js";
import { checkVideoOwnership } from "../middlewares/videoMiddleware.js";
import {
  validateUser,
  validateLogin,
} from "../middlewares/validatedMiddleware.js";

import { isAuthenticated } from "../middlewares/authenticationMiddleware.js";
import { login, register, account } from "../controllers/formController.js";
import {
  getUserVids,
  userChannel,
  getUsername,
} from "../controllers/accountController.js";
import * as routes from "../controllers/routing.js";
import cors from "cors";

const router = express.Router();

const textParser = bodyParser.text({ type: "text/plain" });

router.use(cors());
// Upload routes
router.post(
  "/process",
  uploadTemp.fields([{ name: "video" }, { name: "thumbnail" }]),
  isAuthenticated,
  processUpload
);
router.delete("/revert", textParser, isAuthenticated, revertUpload);
router.post("/submit", upload.none(), isAuthenticated, submit);

// Video routes
router.get("/public", publicVideos);
router.get("/user", userVideos);

// form validation

router.post("/register", upload.none(), validateUser, register);
router.post("/login", upload.none(), validateLogin, login);

router.get("/session", isAuthenticated);
router.get("/login", routes.loginP);
router.get("/account", account);
router.get("/logout", routes.logout);
router.get("/userData", isAuthenticated, getUserVids);
router.get("/loadVideo", checkVideoOwnership, loadVideo);
router.get("/userChannel", userChannel);
router.get("/loginnerData", getUsername);
router.get("/incrementViewCount", incrementViewCount);

export default router;
