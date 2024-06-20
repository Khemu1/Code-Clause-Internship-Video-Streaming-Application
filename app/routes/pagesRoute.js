import express from "express";
import * as routes from "../controllers/routing.js";
import { checkVideoOwnership } from "../middlewares/videoMiddleware.js";

const router = express.Router();

router.get("/login", routes.loginP);
router.get("/register", routes.registerP);
router.get("/home", routes.homeP);
router.get("/yourChannel", routes.profileP);
router.get("/upload", routes.uploadP);
router.get("/userChannel", routes.userChannel);
router.get("/src/css/style.css", routes.css);
router.get("/video", routes.video);
router.get("/notfound", routes.notfound);
router.get("/privateVideo", routes.privateVideo);
router.get("/channelNotFound", routes.channelNotFound);

export default router;
