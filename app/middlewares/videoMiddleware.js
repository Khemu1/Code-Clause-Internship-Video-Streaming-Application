import { Video } from "../database/db.js";
import path from "path";
import { nextTick } from "process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function checkVideoOwnership(req, res, next) {
  try {
    const videoId = req.query.id; // Access the 'id' parameter from the query string
    const userId = req.session.userId;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.sendFile(
        path.join(__dirname, "../../public/pages/notfound.html")
      );
    }
    if (video.type === "private") {
      if (video.userId.toString() === userId) {
        return next();
      } else {
        return res.status(404).json({ redirect: "/api/pages/privateVideo" });
      }
    } else {
      return next();
    }
  } catch (error) {
    console.error("Error checking video ownership:", error);
    return res.status(404).json({ redirect: "/api/pages/notfound" });
  }
}
