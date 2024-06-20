import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/stream");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection error:", error);
  }
};
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

const videoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  description: { type: String },
  path: { type: String },
  thumbnail: { type: String },
  type: { type: String },
  views: { type: Number, default: 0 },
  date: { type: String },
});

const tempSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  id: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Video = mongoose.model("Video", videoSchema);
const Temp = mongoose.model("Temp", tempSchema);

export { connectDB, User, Video, Temp };
