import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import session from "express-session";
import { connectDB } from "./app/database/db.js";
import routes from "./app/routes/routes.js";
import router from "./app/routes/pagesRoute.js";
import { cleanUpTempFiles } from "./app/utils/utils.js";
import cron from "node-cron";

import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
cleanUpTempFiles();
app.use(express.static(path.join(__dirname, "/public")));
connectDB();
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});
app.use(express.json());
app.use(cors());
app.use("", routes);
app.use("/pages", router);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

cron.schedule("0 * * * *", () => {
  console.log("Running cleanup job...");
  cleanUpTempFiles();
});
