require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const util = require("util"); // Tambahkan util untuk promisify

const app = express();
app.use(cors());
app.use(express.json()); // Untuk membaca JSON dari request body

// Konfigurasi koneksi database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_tes_tipologi",
});

// Mengubah fungsi query menjadi promise-based
const query = util.promisify(db.query).bind(db);

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected...");
});

// Endpoint untuk menyimpan jawaban user
app.post("/submit-answers", async (req, res) => {
  const { email, answers } = req.body;

  try {
    const users = await query("SELECT id FROM users WHERE email = ?", [email]);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    const user_id = users[0].id;

    // Debugging: Cek apakah jawaban diterima dengan benar
    console.log("User Email:", users.email);
    console.log("User ID:", user_id);
    console.log("Received Answers:", answers);

    // Mapping jawaban ke skor
    const scoring = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    // Loop untuk menghitung skor berdasarkan aturan
    Object.keys(answers).forEach((key) => {
      const questionIndex = parseInt(key); // Soal mulai dari index 0

      if (questionIndex < 5) {
        if (answers[key] === "A") scoring.E++;
        else scoring.I++;
      } else if (questionIndex < 10) {
        if (answers[key] === "A") scoring.S++;
        else scoring.N++;
      } else if (questionIndex < 15) {
        if (answers[key] === "A") scoring.T++;
        else scoring.F++;
      } else if (questionIndex < 20) {
        if (answers[key] === "A") scoring.J++;
        else scoring.P++;
      }
    });

    // Menentukan hasil akhir berdasarkan skor tertinggi
    const result = `${scoring.E > scoring.I ? "E" : "I"}${
      scoring.S > scoring.N ? "S" : "N"
    }${scoring.T > scoring.F ? "T" : "F"}${scoring.J > scoring.P ? "J" : "P"}`;

    console.log("Calculated Result:", result); // Debugging: Lihat hasil akhir

    // Urutkan jawaban sesuai indeks (0-19) sebelum menyimpan ke database
    const sortedAnswers = Object.keys(answers)
      .sort((a, b) => a - b) // Pastikan urutannya benar
      .map((key) => answers[key] || null); // Jika ada yang kosong, beri null

    // Query insert ke database
    const insertQuery = `
      INSERT INTO jawaban_user (
        jwbn_1, jwbn_2, jwbn_3, jwbn_4, jwbn_5, 
        jwbn_6, jwbn_7, jwbn_8, jwbn_9, jwbn_10, 
        jwbn_11, jwbn_12, jwbn_13, jwbn_14, jwbn_15, 
        jwbn_16, jwbn_17, jwbn_18, jwbn_19, jwbn_20, 
        hasil, created_at, user_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [...sortedAnswers, result, new Date(), user_id];

    await query(insertQuery, values);

    res.json({ message: "Jawaban berhasil disimpan!", result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// Endpoint untuk menyimpan data user
app.post("/save-user", (req, res) => {
  const { nama, nomorHp, email, asalSma, kelas } = req.body;
  const query = `
    INSERT INTO users (nama, nomor_hp, email, asal_sma, kelas, created_at)
    VALUES (?, ?, ?, ?, ?, NOW())`;

  db.query(query, [nama, nomorHp, email, asalSma, kelas], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "User saved successfully!", id: result.insertId });
  });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
