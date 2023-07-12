import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

//# untuk megenerate tabel pada database secara otomatis
// (async () => {
//  await db.sync();
// })();

// MIDDLEWARE
app.use(
  session({
    secret: process.env.SESS_SECRET, // session diambil dari .env
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto", // memakai auto agar secure di set otomatis jika http maka false dan https maka true
    },
  })
);

app.use(
  cors({
    credentials: true, // agar frontend dapat mengirimkan request beserta cookie degan menyertakan credentials nya
    origin: "http://localhost:3000", // domain yang diizinkan untuk mengakses api
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running..."); // Untuk mengambil port dari .env
});
