import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { Temp, Video } from "../database/db.js";
import express from "express";
import {
  validateUpload,
  transformYupErrorsIntoObject,
  formatDate,
} from "../utils/utils.js";

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

export const processUpload = async (req, res) => {
  console.log(req.files.video);
  if (!req.files) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  if (req.files.video) {
    console.log("video");
    console.log(req.files.video[0].filename);
    let videoId = req.files.video[0].filename;
    req.session.tempVid = videoId;
    console.log("after adding", videoId);
    let temp = new Temp({ userId: req.session.userId, id: videoId });
    await temp.save();
    return res.send(videoId);
  } else {
    console.log("thumb");
    let thumbnailId = req.files.thumbnail[0].filename;
    req.session.tempThumb = thumbnailId;
    console.log("after adding", thumbnailId);
    let temp = new Temp({ id: thumbnailId });
    await temp.save();
    res.send(thumbnailId);
  }
};

export const revertUpload = async (req, res) => {
  console.log(req.body);
  const uniqueFileId = req.body;

  try {
    const tempFile = await Temp.findOne({ id: uniqueFileId });
    if (tempFile) {
      const filePath = path.join(
        __dirname,
        "../../public/assets/temp",
        tempFile.id
      );
      console.log(filePath);
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to delete file" });
        }
        await Temp.deleteOne({ id: uniqueFileId });
        req.session.temp = undefined;
        console.log("after deleting", req.session.temp);
        res.json({ success: true });
      });
    } else {
      res.status(404).json({ error: "File not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

export const submit = async (req, res) => {
  let data = {};
  try {
    data = await validateUpload.validate(
      {
        title: req.body.title,
        description: req.body.description,
        file: req.body.video,
        thumb: req.body.thumbnail,
        radioGroup: req.body.type,
      },
      { abortEarly: false }
    );
  } catch (error) {
    return res.status(401).json({
      body: {
        errors: transformYupErrorsIntoObject(error),
      },
    });
  }
  console.log(data);
  try {
    const video = new Video({
      userId: req.session.userId,
      title: data.title,
      description: data.description,
      path: data.file,
      thumbnail: data.thumb,
      type: data.radioGroup,
      date: formatDate(),
    });
    video.save();

    const oldPathVid = path.join(
      __dirname,
      "../../public/assets/temp",
      data.file
    );
    const newPathVid = path.join(
      __dirname,
      "../../public/assets/videos",
      data.file
    );
    fs.renameSync(oldPathVid, newPathVid, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to rename file" });
      }
    });
    if (data.thumb) {
      const oldPathThumb = path.join(
        __dirname,
        "../../public/assets/temp",
        data.thumb
      );
      const newPathThumb = path.join(
        __dirname,
        "../../public/assets/thumbnails",
        data.thumb
      );
      fs.renameSync(oldPathThumb, newPathThumb, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to rename file" });
        }
      });
      await Temp.deleteOne({ id: req.session.tempThumb });
    }
    await Temp.deleteOne({ id: req.session.tempVid });

    req.session.temp = undefined;
    return res.status(200).send("done");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
};
