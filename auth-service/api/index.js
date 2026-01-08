const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Konfigurasi Koneksi Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_auth",
});

// Cek Koneksi Database saat Startup
db.connect((err) => {
  if (err) {
    console.error("Koneksi Database GAGAL: " + err.stack);
    return;
  }
  console.log("Terhubung ke Database MySQL (db_auth)");
});

// --- ENDPOINT REGISTER ---
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username dan password wajib diisi!" });
  }

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("Error Register:", err.message); // Menampilkan error di terminal
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Username sudah digunakan!" });
      }
      if (err.code === "ER_BAD_DB_ERROR") {
        return res
          .status(500)
          .json({ message: "Database 'db_auth' tidak ditemukan!" });
      }
      if (err.code === "ER_NO_SUCH_TABLE") {
        return res.status(500).json({ message: "Tabel 'users' belum dibuat!" });
      }
      return res
        .status(500)
        .json({ message: "Database Error: " + err.message });
    }
    res.json({ message: "Registrasi berhasil! Silakan Login." });
  });
});

// --- ENDPOINT LOGIN ---
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Isi Username dan Password!" });
  }

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("Error Login:", err.message);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan pada server database." });
    }

    if (results.length > 0) {
      res.json({ success: true, message: "Login Berhasil!" });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Username atau Password salah!" });
    }
  });
});

app.listen(3003, () =>
  console.log("Auth Service berjalan di http://localhost:3003")
);
