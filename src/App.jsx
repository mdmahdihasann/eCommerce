import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import LoginPage from "./page/LoginPage";
import Frontend from "./components/Frontend";
import RegisterPage from "./page/RegisterPage";
import Dashboard from "./dashboard/Dashboard";


function App() {
  

  return (
    <>
    <Routes>
      <Route element={<Frontend/>}>
        <Route path="/" element={<HomePage/>}/>
      </Route>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
    </>
  );
}

export default App;
