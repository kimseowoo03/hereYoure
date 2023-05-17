import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Signup";
import PasswordFindPage from "./pages/PasswordFindPage";
import UserPage from "./pages/UserPage";
import WorkRoomDetailPage from "./pages/WorkRoomDetailPage";
import WorkerDetailPage from "./pages/WorkerDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="mypage" element={<UserPage />} />
        <Route path="mypage/:workroom" element={<WorkRoomDetailPage />} />
        <Route path="mypage/:workroom/:workerid" element={<WorkerDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="login/passwordfind" element={<PasswordFindPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
