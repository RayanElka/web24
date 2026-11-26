// app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Stel EJS in als view-engine
app.set("view engine", "ejs");

// Routes importeren
import uitgavenRoutes from "./routes/Uitgaven.js";
app.use("/", uitgavenRoutes);

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
