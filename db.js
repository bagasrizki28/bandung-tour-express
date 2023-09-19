import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  database: "bagas_project",
});

const conn = await pool.getConnection();
console.log("Data Base berhasil dimuat.");

export default conn;
