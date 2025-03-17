import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./components/common/NotFound";
import Soal from "./pages/soal/Soal";
import DataUser from "./pages/DataUser";
import Hasil from "./pages/soal/Hasil";

function AppRoutes() {
  const [userData, setUserData] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/isi-data-diri"
        element={<DataUser onStart={setUserData} />}
      />
      <Route
        path="/soal"
        element={
          userData ? (
            <Soal userData={userData} />
          ) : (
            <DataUser onStart={setUserData} />
          )
        }
      />
      <Route path="/hasil-tes-tipologi" element={<Hasil />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
