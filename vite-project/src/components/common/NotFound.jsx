import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center bg-white rounded-xl shadow-lg p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 bg-red-500/10 w-40 h-40 rounded-full"></div>
        <div className="absolute -bottom-16 -left-16 bg-blue-500/10 w-40 h-40 rounded-full"></div>

        <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>

        <div className="w-16 h-1 bg-red-500 mx-auto mb-8"></div>

        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Halaman Tidak Ditemukan
        </h2>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman mungkin
          telah dipindahkan atau dihapus.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 w-full sm:w-auto text-center"
          >
            Kembali ke Beranda
          </Link>

          <Link
            to="/about"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition duration-300 w-full sm:w-auto text-center"
          >
            Tentang Kami
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
