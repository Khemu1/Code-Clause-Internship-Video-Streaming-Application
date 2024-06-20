import { User } from "../database/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function register(req, res) {
  console.log(req.validatedData);
  try {
    let checkEmail = await User.findOne({
      email: req.validatedData.email,
    }).select("email");
    let checkUsername = await User.findOne({
      username: req.validatedData.username,
    }).select("username");

    if (checkEmail) {
      return res.status(400).json({
        errors: { email: "Email already exists" },
      });
    }

    if (checkUsername) {
      return res.status(400).json({
        errors: { username: "Username already exists" },
      });
    }

    const user = new User({
      username: req.validatedData.username,
      email: req.validatedData.email,
      password: req.validatedData.password,
    });

    await user.save();

    req.session.userId = user._id.toString();

    res.status(201).json({ redirect: "/api/pages/home" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}


export async function login(req, res) {
  console.log(req.validatedData);
  try {
    const user = await User.findOne({
      email: req.validatedData.email,
      password: req.validatedData.password,
    });
    if (user) {
      console.log(user._id.toString());
      req.session.userId = user._id.toString();
      return res.status(200).json("found");
    }
    return res.status(400).json({
      errors: {
        error: "Invalid email or password",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function account(req, res) {
  console.log(req.session.userId);
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ redirect: "/api/pages/login" });
    }
    res.status(200).json({ account: { username: user.username } });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.redirect("/api/pages/login");
  });
}
