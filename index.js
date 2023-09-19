import jwt from "jsonwebtoken";
import express from "./express.js";
import multer from "multer";
import { login } from "./route/route-auth.js";
import {
  register,
  reading,
  updatePassword,
  deleteAccounts,
  getBooking,
  bookingKamar,
  getAllAccounts,
  updateReservasi,
  deleteBooking,
  detailBooking,
} from "./route/route-user.js";

const app = express();

app.use(express.static("public"));

app.use(express.json());

function authMiddleware(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret", async (err, decoded) => {
      if (!err) {
        req.user = decoded;
        next();
      } else {
        res.status(401).send("Token Invalid.");
      }
    });
  } else {
    res.status(401).send("Token Tidak Terdeteksi.");
  }
}

const upload = multer({ dest: "public/photos" });

//Login

app.post("/api/login", login);

//Read all Users
app.get("/api/accounts", getAllAccounts);

//Register Users
app.post("/api/register", upload.single("photo"), register);

app.use(authMiddleware);

//Room Booking
app.post("/api/roombooking", bookingKamar);

//Read
app.get("/api/booking", getBooking);

//Read by id
app.get("/api/booking/:id_kamar", detailBooking);

//Search by id
app.get("/api/accounts/:id", reading);

//Update Data User
app.put("/api/changepassword/", updatePassword);

//Update Reservation
app.put("/api/booking/:id_kamar", updateReservasi);

//Delete Account
app.delete("/api/deleteaccounts/:id", deleteAccounts);

//Clear Booking
app.delete("/api/booking/:id_kamar", deleteBooking);

// app.get("*", (req, res) => res.status(404).send("Halaman tidak tersedia."));

app.listen(3000, () => console.log("Server Sedang Berjalan!"));
