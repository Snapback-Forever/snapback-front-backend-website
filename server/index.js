import express from "express";
import cors from "cors";
import helmet from "helmet";
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
 "https://snapbackforever.com"
];

/* -----------------------------
   SECURITY HEADERS
------------------------------*/
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);
app.disable("x-powered-by");


/* -----------------------------
   CORS CONFIG
------------------------------*/
app.use(
  cors({
    origin: function (origin, callback) {

      console.log("Incoming Origin:", origin);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked CORS Origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }

    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
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