import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";
import testRoute from "./routes/test.route";
import userRoute from "./routes/user.route";
import postRoute from "./routes/post.route";
import chatRoute from "./routes/chat.route";
import messageRoute from "./routes/message.route";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/test", testRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);
app.use("/api/post", postRoute);

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
