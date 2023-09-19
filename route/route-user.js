import { decode } from "jsonwebtoken";
import conn from "../db.js";

//Read Users
export async function getAllAccounts(_req, res) {
  const rows = await conn.query("SELECT * FROM accounts");
  res.send(rows);
}

//Register
export async function register(req, res) {
  await conn.query(
    `INSERT INTO accounts VALUES ('${req.body.nama_depan}', '${req.body.nama_belakang}', '${req.body.username}', '${req.body.password}', '${req.body.jenis_kelamin}', '${req.body.email}', '${req.body.no_telp}', '${req.body.alamat}', '${req.file.filename}', NULL)`
  );
  res.send("User telah ditambahkan.");
}

//booking
export async function bookingKamar(req, res) {
  await conn.query(
    `INSERT INTO booking VALUES (NULL, '${req.body.date_check_in}', '${req.body.date_check_out}', '${req.body.adult}', '${req.body.child}', '${req.body.room_type}')`
  );
  res.send("Telah memboking.");
}

//Read Booking
export async function getBooking(_req, res) {
  const rows = await conn.query("SELECT * FROM booking");
  res.send(rows);
}

export async function detailBooking(req, res) {
  const rows = await conn.query(
    `SELECT * FROM booking WHERE id_kamar = '${req.params.id_kamar}'`
  );
  res.send(rows[0]);
}

//Select by id
export async function reading(req, res) {
  const rows = await conn.query(
    `SELECT * FROM accounts WHERE id = '${req.params.id}'`
  );
  res.send(rows[0]);
}

//Update User data
export async function updatePassword(req, res) {
  await conn.query(
    `UPDATE accounts SET username = '${req.body.username}', password = '${req.body.password}' WHERE id = '${req.user.id}'`
  );
  res.send("Data User berhasil di Update!");
}

//Update Reservasi
export async function updateReservasi(req, res) {
  await conn.query(
    `UPDATE booking SET date_check_in = '${req.body.date_check_in}', date_check_out = '${req.body.date_check_out}' WHERE id_kamar = '${req.params.id_kamar}'`
  );
  res.send("Reservasi berhasil di Update!");
}

//Delete Account
export async function deleteAccounts(req, res) {
  await conn.query(`DELETE FROM accounts WHERE id = '${req.params.id}'`);
  res.send("Akun Berhasil di Hapus!");
}

//Delete Reservaton
export async function deleteBooking(req, res) {
  await conn.query(
    `DELETE FROM booking WHERE id_kamar = '${req.params.id_kamar}'`
  );
  res.send("Selesai!!");
}
