import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DataUser = ({ onStart }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    nomorHp: "",
    email: "",
    asalSma: "",
    kelas: "",
  });

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setIsValid(
      Object.values(newFormData).every((field) => field.trim() !== "")
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Gagal menyimpan data!");

      const result = await response.json();
      alert(result.message);

      // Simpan data ke sessionStorage sebelum berpindah halaman
      sessionStorage.setItem("userData", JSON.stringify(formData));

      // Kirim data ke AppRoutes dan pindah ke halaman soal
      onStart(formData);
      navigate("/soal");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Data Diri
        </h2>
        <div className="space-y-3">
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={formData.nama}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="tel"
            name="nomorHp"
            placeholder="Nomor HP"
            value={formData.nomorHp}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="asalSma"
            placeholder="Asal SMA"
            value={formData.asalSma}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="kelas"
            placeholder="Kelas"
            value={formData.kelas}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              isValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Menyimpan..." : "Mulai Tes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataUser;
