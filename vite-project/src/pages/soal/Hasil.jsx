import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Hasil = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const resultString = params.get("result"); // Ambil hasil tes dari URL

  const [result, setResult] = useState(null);
  const [deskripsi, setDeskripsi] = useState([]);
  const [karir, setKarir] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      console.log("Raw result from URL:", resultString);

      // Tidak perlu parsing JSON karena result sudah berupa string (MBTI type)
      setResult(resultString);

      if (!resultString) {
        setError("Hasil tes tidak valid.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      // Ganti bagian Promise.all
      Promise.all([
        fetch(`/txt/${resultString}.txt`).then(async (res) => {
          if (!res.ok) throw new Error("File deskripsi tidak ditemukan.");
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("text/plain")) {
            throw new Error("Respons bukan file teks");
          }
          return res.text();
        }),
        fetch(`/txt/Karir${resultString}.txt`).then(async (res) => {
          if (!res.ok) throw new Error("File deskripsi tidak ditemukan.");
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("text/plain")) {
            throw new Error("Respons bukan file teks");
          }
          return res.text();
        }),
      ])
        .then(([descText, jobText]) => {
          const parseText = (text) =>
            text
              .trim()
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line !== "");

          setDeskripsi(parseText(descText));
          setKarir(parseText(jobText));
        })
        .catch((err) => {
          console.error("Error fetching files:", err);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.error("Error processing result:", err);
      setError("Data hasil tes rusak.");
      setLoading(false);
    }
  }, [resultString]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 sm:p-6">
      <div className="max-w-4xl w-full bg-white p-6 sm:p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Hasil Tes Kepribadian Kamu{" "}
          <span className="text-blue-600 block mt-2 sm:inline-block text-6xl">
            {result || "Tidak Diketahui"}
          </span>
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-52 gap-3">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Memuat hasil...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <p className="text-red-600 font-medium text-lg">⚠️ {error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Deskripsi Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200">
                📝 Deskripsi Kepribadian
              </h2>
              <div className="bg-gray-50 p-5 rounded-xl shadow-inner">
                {deskripsi.length > 0 ? (
                  <ul className="space-y-3 text-gray-700">
                    {deskripsi.map((line, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-justify"
                      >
                        <span className="text-blue-500 mt-1">•</span>
                        <p className="flex-1 text-base leading-relaxed">
                          {line}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">
                    Tidak ada deskripsi yang tersedia
                  </p>
                )}
              </div>
            </section>

            {/* Karir Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200">
                💼 Rekomendasi Karir
              </h2>
              <div className="bg-gray-50 p-5 rounded-xl shadow-inner">
                {karir.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {karir.map((line, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400 hover:border-blue-600 transition-colors"
                      >
                        <p className="text-gray-700 font-medium">▹ {line}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    Tidak ada rekomendasi karir yang tersedia
                  </p>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hasil;
