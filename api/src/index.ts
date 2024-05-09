import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";
import testRoute from "./routes/test.route";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
