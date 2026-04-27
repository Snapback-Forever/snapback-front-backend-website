import express from "express"
import cors from "cors"
import config from "./config.js"
import db from "./db/index.js"
import routes from "./routes/index.js"
import cookieParser from "cookie-parser"


const app = express()

const PORT = config.PORT || 8080

const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'http://localhost:4173',
    'http://127.0.0.1:8080',
    'https://snapback.com'
  ];

  app.use(cors({
    origin: function (origin, callback) {
      // console.log('Request Origin:', origin); // <-- add this
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.json({
        message: "Server running at " + PORT
    })
})

app.listen(PORT, () => {
    console.log("server running at " + PORT)
})

app.use(routes)
db.connect(app)

export default app