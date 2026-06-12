import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import compression from "compression";
import { jsonValidator } from "./middleware/validator";


const app = express();

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

app.use(express.json());
app.use(jsonValidator);
app.use(cors({
    origin: "localhost:8080"
}));
app.use(morgan("combined"));
app.use(cookieParser());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
}));
app.use(compression());

export default app;