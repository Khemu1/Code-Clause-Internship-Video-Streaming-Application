import { User, Video } from "../database/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getUserVids(req, res) {
  try {
    let videos = await Video.find({ userId: req.session.userId }).select(
      "title _id path thumbnail views type"
    );
    let username = await User.findById(req.session.userId).select("username");

    res.status(200).json({ Videos: videos, username: username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error loading user videos page" });
  }
}

export async function getUsername(req, res) {
  try {
    let username = await User.findById(req.session.userId).select("username");
    if (username) {
      return res.status(200).json({ username });
    }
    return res.status(404).json({ error: "Error loading user username page" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error loading user videos page" });
  }
}

export async function userChannel(req, res) {
  try {
    const userId = req.query.id;
    const user_username = await User.findById(userId).select("username -_id");

    const user_videos = await Video.find({
      userId: userId,
      type: "public",
    }).select("title path thumbnail views");
    if (!user_username) {
      return res.status(404).json({ redirect: "/api/pages/channelNotfound" });
    }

    res.status(200).json({ user_videos, user_username });
  } catch (error) {
    console.error("Error fetching video:", error);
    return res.status(404).json({ redirect: "/api/pages/notfound" });
  }
}
