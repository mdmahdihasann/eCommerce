import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import LoginPage from "./page/LoginPage";


function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
    </>
  );
}

export default App;
