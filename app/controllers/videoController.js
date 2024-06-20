import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { Video, User } from "../database/db.js";
import express from "express";

export async function publicVideos(req, res) {
  try {
    const publicVideos = await Video.find({ type: "public" });
    res.status(200).json(publicVideos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function userVideos(req, res) {
  try {
    const userId = req.session.id;
    const userVideos = await Video.find({ userId: req.user._id });
    res.status(200).json(userVideos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function loadVideo(req, res) {
  try {
    const videoId = req.query.id;
    console.log(videoId);
    const video = await Video.findById(videoId).select(
      "title _id path description views date userId -_id"
    );
    const uploader = await User.findById(video.userId.toString()).select(
      "username _id"
    );
    const videos = await Video.find({
      _id: { $ne: videoId },
      type: "public",
    }).select("title _id path thumbnail views");
    videos.sort(() => Math.random() - 0.5);
    if (!video) {
      return res.status(404).json({ redirect: "/api/pages/notfound" });
    }

    res.status(200).json({ video, uploader, videos });
  } catch (error) {
    console.error("Error fetching video:", error);
    return res.status(404).json({ redirect: "/api/pages/notfound" });
  }
}

export async function incrementViewCount(req, res) {
  const videoId = req.query.id;
  try {
    const video = await Video.findByIdAndUpdate(videoId, {
      $inc: { views: 1 },
    });
    return res.status(200).json("success");
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return res.status(500).json("error");
  }
}
