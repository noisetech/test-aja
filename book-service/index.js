const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_buku",
});

// [READ] Ambil semua data
app.get("/books", (req, res) => {
  db.query("SELECT * FROM buku", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// [CREATE] Tambah buku baru
app.post("/books", (req, res) => {
  const { judul_buku, penulis, stok } = req.body;
  db.query(
    "INSERT INTO buku (judul_buku, penulis, stok) VALUES (?, ?, ?)",
    [judul_buku, penulis, stok],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Buku berhasil ditambah!" });
    }
  );
});

// [UPDATE] Edit stok atau data buku
app.put("/books/:id", (req, res) => {
  const { judul_buku, penulis, stok } = req.body;
  db.query(
    "UPDATE buku SET judul_buku=?, penulis=?, stok=? WHERE id=?",
    [judul_buku, penulis, stok, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Buku berhasil diperbarui!" });
    }
  );
});

// [DELETE] Hapus buku
app.delete("/books/:id", (req, res) => {
  db.query("DELETE FROM buku WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Buku berhasil dihapus!" });
  });
});

app.listen(3001, () => console.log("Book Service running on port 3001"));
