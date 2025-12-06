import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const Frontend = () => {
  return (
    <>
    <Header/>
      <main className="max-w-[1300px] w-full mx-auto px-4">
        <div className="container">
          <Outlet />
        </div>
      </main>
    <Footer/>
    </>
  );
};

export default Frontend;
