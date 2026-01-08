const express = require("express");
const cors = require("cors");

const app = express();

// ===== CORS PALING ATAS (WAJIB) =====
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ===== PARSER =====
app.use(express.json());

// ===== TEST ROOT =====
app.get("/", (req, res) => {
  res.json({ message: "Auth Service OK" });
});

// ===== REGISTER =====
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username dan password wajib diisi",
    });
  }

  return res.json({
    success: true,
    message: "Registrasi berhasil",
  });
});

// ===== LOGIN =====
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "test@gmail.com" && password === "password") {
    return res.json({
      success: true,
      message: "Login berhasil",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Username atau password salah",
  });
});

// ===== EXPORT UNTUK VERCEL =====
module.exports = app;
