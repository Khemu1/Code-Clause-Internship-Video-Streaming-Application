import path from "path";
import { fileURLToPath } from "url";
import { Video } from "../database/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loginP(req, res) {
  try {
    res.sendFile(path.join(__dirname, "../../public/pages/login.html"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading login page");
  }
}
export async function registerP(req, res) {
  try {
    res.sendFile(path.join(__dirname, "../../public/pages/register.html"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading login page");
  }
}
export async function homeP(req, res) {
  try {
    res.sendFile(path.join(__dirname, "../../index.html"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading home page");
  }
}

export async function uploadP(req, res) {
  try {
    res.sendFile(path.join(__dirname, "../../public/pages/upload.html"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading upload page");
  }
}

export async function profileP(req, res) {
  try {
    res.sendFile(path.join(__dirname, "../../public/pages/yourChannel.html"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading profile page");
  }
}
export async function userChannel(req, res) {
  try {
    if (req.query.id === req.session.userId) {
      return res.sendFile(
        path.join(__dirname, "../../public/pages/yourChannel.html")
      );
    }
    return res.sendFile(
      path.join(__dirname, "../../public/pages/userChannel.html")
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading profile page");
  }
}
export async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.sendFile(path.join(__dirname, "../../public/pages/login.html"));
  });
}

export async function css(req, res) {
  try {
    res.sendFile(path.join(__dirname, "../../public/css/style.css"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading css page");
  }
}
export async function video(req, res) {
  try {
    const videoId = req.query.id;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ redirect: "/api/pages/notfound" });
    }
    res.sendFile(path.join(__dirname, "../../public/pages/video.html"));
  } catch (error) {
    res.sendFile(path.join(__dirname, "../../public/pages/notfound.html"));
  }
}

export async function notfound(req, res) {
  res.sendFile(path.join(__dirname, "../../public/pages/notfound.html"));
}
export async function privateVideo(req, res) {
  res.sendFile(path.join(__dirname, "../../public/pages/privateVideo.html"));
}
export async function channelNotFound(req, res) {
  res.sendFile(path.join(__dirname, "../../public/pages/channelNotFound.html"));
}
