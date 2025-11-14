import cookieParser from "cookie-parser";
import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import passport from "passport";
import { Env } from "./configs/env.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "./configs/http.config";
import connectDatabase from "./configs/database.config";
import "./configs/passport.config";
import routes from "./routes";
import { initializeSocket } from "./lib/socket";
import path from "path";

const app = express();
const server = http.createServer(app);

// socket
initializeSocket(server);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(passport.initialize());

app.get(
  "/health",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({ status: "OK", message: "Healthy" });
  })
);

app.use("/api", routes);

if (Env.NODE_ENV === "production") {
  const clientPath = path.resolve(__dirname, "../../client/dist");

  app.use(express.static(clientPath));

  app.get(/^(?!\/api).*/, (req: Request, res: Response) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

server.listen(Env.PORT, async () => {
  await connectDatabase();
  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
