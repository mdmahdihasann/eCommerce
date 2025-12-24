import { useEffect, useState } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import UserImage from "../assets/profile/DoctorYunus.png";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// Reusable StatCard
const StatCard = ({
  title,
  value,
  change,
  changeType,
  icon,
  iconColor,
  bgColor,
}) => {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm flex items-center justify-between transition transform text-white`}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <div
              className={`text-2xl opacity-90 mb-2 ${iconColor} ${bgColor} w-[44px] h-[44px] rounded-full p-[10px]`}
            >
              {icon}
            </div>
            <h3 className="text-lg text-gray-500 font-normal capitalize tracking-wide opacity-80">
              {title}
            </h3>
            <p className="text-3xl text-black font-semibold mt-1">{value}</p>
          </div>
          <div className="text-2xl opacity-90 mb-2 text-gray-800 w-[44px] h-[44px] bg-gray-200 rounded-full p-[10px] hover:bg-gray-300 transition">
            <FiArrowUpRight />
          </div>
        </div>
        <div
          className={` bg-[#e3e6fe] w-full p-2 rounded mt-4 text-center flex items-center justify-center `}
        >
          <span className="text-[16px] mr-4 text-black">13k Last Week</span>{" "}
          <span
            className={`flex gap-2 items-center ${
              changeType === "up" ? "text-red-700" : "text-blue-500"
            }`}
          >
            {changeType === "up" ? <FaArrowTrendUp /> : <FaArrowTrendDown />}{" "}
            {change}
          </span>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [mode, setMode] = useState(false);
  const [open, setOpen] = useState(false);
  const {auth, setAuth} = useAuth();
    const Navigate = useNavigate();
  const handleLogout = () => {
    setAuth({});
    Navigate("/");
  };

   // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (mode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setMode(!mode);
  };


  return (
    <div className="relative bg-gray-100 text-gray-800">
      <aside className="w-[100%] flex justify-between items-center px-6 min-h-[73px] bg-white border-l border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setMode(toggleDarkMode)}
            className="w-10 h-10 flex items-center mr-4 justify-center rounded-full bg-gray-100 text-gray-700"
          >
            {mode ? <FaSun /> : <FaMoon />}
          </button>

          <div>
            <div className="flex items-center cursor-pointer gap-2" onClick={()=>setOpen(!open)}>
              <img
                src={UserImage}
                className="w-[40px] h-auto rounded-lg"
                alt="User Name"
              />
              <div className="flex items-center gap-2">
                <p className="text-lg font-medium text-gray-800">
                  {auth?.user?.firstName} {auth?.user?.lastName}
                </p>
                <span><IoIosArrowDown/></span> 
              </div>
            </div>

            {open && (
              <div className="absolute right-6 p-1 mt-3 w-44 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
                <div className="px-2 py-2 mb-1">
                  <p className="text-lg font-normal text-gray-800">
                    {auth?.user?.firstName} {auth?.user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <button onClick={handleLogout} className="w-full rounded-lg text-center px-4 py-2 text-sm hover:bg-red-200 bg-red-100 text-red-600">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className="p-6 bg-gray-100 min-h-screen ">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Sales"
            value="$643,826"
            change="85.5%"
            changeType="up"
            icon={<AiOutlineDollar />}
            iconColor="text-white"
            bgColor="bg-yellow-500"
          />
          <StatCard
            title="Total User"
            value="5000"
            change="85.5%"
            changeType="in"
            icon={<FaRegUser />}
            iconColor="text-white"
            bgColor="bg-blue-500"
          />
          <StatCard
            title="Total Earning"
            value="15,000K"
            change="85.5%"
            changeType="in"
            icon={<BiMoneyWithdraw />}
            iconColor="text-white"
            bgColor="bg-yellow-500"
          />
          <StatCard
            title="Total Buyers"
            value="8000"
            change="85.5%"
            changeType="up"
            icon={<FaRegUser />}
            iconColor="text-white"
            bgColor="bg-blue-500"
          />
        </div>

        {/* Graph Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Orders Graph</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400">
            [Graph Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
