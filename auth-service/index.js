const express = require("express");
const cors = require("cors");

const app = express();

// ===== MIDDLEWARE =====
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.options("*", cors());

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

  // simulasi sukses
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

// ===== EXPORT (WAJIB UNTUK VERCEL) =====
module.exports = app;
