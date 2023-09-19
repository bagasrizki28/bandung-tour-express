import conn from "../db.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const rows = await conn.query(
    `SELECT * FROM accounts WHERE username = '${req.body.username}'`
  );
  if (rows.length > 0) {
    if (req.body.password === rows[0].password) {
      const token = jwt.sign(rows[0], "secret");
      res.send(token);
    } else {
      res.status(401).send("Kata Sandi Salah!");
    }
  } else {
    res.status(401).send("Nama Pengguna Tidak Ada!");
  }
}
