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
  database: "db_pinjam",
});

// [READ] Ambil semua riwayat peminjaman
app.get("/borrow", (req, res) => {
  db.query("SELECT * FROM peminjam", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// [CREATE] Tambah peminjaman baru (Sudah Anda miliki sebelumnya)
app.post("/borrow", (req, res) => {
  const { book_id, nama_peminjam } = req.body;
  const tanggal = new Date().toISOString().split("T")[0];
  db.query(
    "INSERT INTO peminjam (nama_peminjam, buku, tanggal) VALUES (?, ?, ?)",
    [nama_peminjam, `Buku ID: ${book_id}`, tanggal],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Peminjaman berhasil dicatat!" });
    }
  );
});

// [UPDATE] Edit data peminjam atau nama buku di riwayat
app.put("/borrow/:id", (req, res) => {
  const { nama_peminjam, buku } = req.body;
  db.query(
    "UPDATE peminjam SET nama_peminjam = ?, buku = ? WHERE id = ?",
    [nama_peminjam, buku, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Riwayat peminjaman berhasil diperbarui!" });
    }
  );
});

// [DELETE] Hapus riwayat peminjaman
app.delete("/borrow/:id", (req, res) => {
  db.query("DELETE FROM peminjam WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Riwayat berhasil dihapus!" });
  });
});

app.listen(3002, () => console.log("Borrow Service running on port 3002"));
