import express, { Application, Request, Response } from "express";

import cors from "cors";
import globalErrorHandler from "./middlewares/globarErrorHandler";
import notFoundHandler from "./middlewares/notFoundHandler";
import router from "./routes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send("👗 DressWave backend server is running!");
});

app.use("/api", router);

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
