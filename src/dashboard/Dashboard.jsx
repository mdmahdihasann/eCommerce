import { Navigate, Outlet } from "react-router-dom";
import Sideber from "./Sideber";
import { useAuth } from "../hooks/useAuth";
const Dashboard = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth?.authToken ? (
        <div className="flex h-screen bg-gray-100 text-gray-800 ">
          <Sideber />

          <div className="flex-1 flex flex-col overflow-auto">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};

export default Dashboard;
