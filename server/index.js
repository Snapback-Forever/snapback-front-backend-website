import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import config from "./config.js";
import db from "./db/index.js";
import routes from "./routes/index.js";

const app = express();

const PORT = config.PORT || 8080;

/* -----------------------------
   ALLOWED ORIGINS
------------------------------*/
const allowedOrigins = [
 "https://snapbackForever.com"
];

/* -----------------------------
   SECURITY HEADERS
------------------------------*/
app.use(helmet());
app.disable("x-powered-by");

/* -----------------------------
   RATE LIMITING
------------------------------*/
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limit per IP
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

/* -----------------------------
   CORS CONFIG
------------------------------*/
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/* -----------------------------
   BODY PARSERS
------------------------------*/
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


/* -----------------------------
   ROOT TEST ROUTE
------------------------------*/
app.get("/", (req, res) => {
  res.json({
    message: "Server running at " + PORT
  });
});

/* -----------------------------
   ROUTES
------------------------------*/
app.use(routes);

/* -----------------------------
   DATABASE CONNECTION
------------------------------*/
db.connect(app);

/* -----------------------------
   START SERVER
------------------------------*/
app.listen(PORT, () => {
  console.log("server running at " + PORT);
});

export default app;