import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
