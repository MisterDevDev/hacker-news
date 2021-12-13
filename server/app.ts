import express, { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../types/express";
import path from "path";

const app = express();

const PORT = process.env.PORT || 8080;
const PUBLIC_PATH = path.join(__dirname, "../public");
const DIST_PATH = path.join(__dirname, "../dist");

app.use(express.json());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

app.use("/api", require("./api"));

app.get("*", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
