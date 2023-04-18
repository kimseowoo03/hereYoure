import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Signup";
import PasswordFindPage from "./pages/PasswordFindPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:userId" element={<UserPage />}/>
      <Route path="login" element={<LoginPage />} />
      <Route path="login/passwordfind" element={<PasswordFindPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
