import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config.js";

import { adRouter } from "./routes/ad.js";
import { commentRouter } from "./routes/comment.js";
import { userRouter } from "./routes/user.js";
import { roleRouter } from "./routes/role.js";
import {authRouter} from "./routes/auth.js";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use("/api/ads", adRouter);
app.use("/api/comments", commentRouter);
app.use("/api/users", userRouter);
app.use("/api/roles", roleRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Wrong route" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});



export default app;
