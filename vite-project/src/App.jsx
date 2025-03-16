import { Routes } from "react-router-dom";
import AppRoutes from "./routes";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App;
