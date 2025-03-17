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
      // Parse jika result berbentuk JSON string
      const parsedResult = resultString ? JSON.parse(resultString) : null;
      setResult(parsedResult);

      if (!parsedResult) {
        setError("Hasil tes tidak valid.");
        setLoading(false);
        return;
      }

      //   const tipe = parsedResult.tipe; // Ambil properti yang relevan

      setLoading(true);
      setError(null);

      Promise.all([
        fetch(`/txt/${parsedResult}.txt`).then(async (res) => {
          if (!res.ok) throw new Error("File deskripsi tidak ditemukan.");
          return res.text();
        }),
        fetch(`/txt/Karir${parsedResult}.txt`).then(async (res) => {
          if (!res.ok) throw new Error("File karir tidak ditemukan.");
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
      console.error("Error parsing result:", err);
      setError("Data hasil tes rusak.");
      setLoading(false);
    }
  }, [resultString]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Hasil Tes:{" "}
          <span className="text-blue-600">
            {typeof result === "string" ? result : "Tidak Diketahui"}
          </span>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Deskripsi Kepribadian
              </h2>
              <div className="text-gray-600 bg-gray-100 p-4 rounded-lg">
                {deskripsi.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {deskripsi.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  "Tidak ada deskripsi yang tersedia."
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Rekomendasi Karir
              </h2>
              <div className="text-gray-600 bg-gray-100 p-4 rounded-lg">
                {karir.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {karir.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  "Tidak ada rekomendasi karir yang tersedia."
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hasil;
