import React, { useContext, useState } from "react"; 
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Icon from "../Elements/Icon";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import { logoutService } from "../../services/authService";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { DarkModeContext } from "../../context/darkModeContext";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

function MainLayout(props) {
  const { children } = props;

  const themes = [
    { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
    { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
    { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
    { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
    { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
  ];

  const { theme, setTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    { id: 3, name: "Transaction", icon: <Icon.Transaction />, link: "/transaction" },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expense" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true); 
    try {
      await logoutService();
      
      setTimeout(() => {
        logout(); 
        setIsLoggingOut(false);
      }, 1500);

    } catch (err) {
      console.error(err);
      if (err.status === 401) {
        logout();
      }
      setIsLoggingOut(false); 
    }
  };

  return (
    <>
      {isDarkMode && (
        <style>{`
          /* 1. Mengubah semua Card menjadi abu-abu gelap yang elegan */
          main .bg-white, main [class*="bg-white"] {
            background-color: #2b2b2b !important;
            color: #ffffff !important;
            border-color: #3f3f3f !important;
          }

          /* 2. Memaksa judul dan teks umum menjadi putih */
          main h1, main h2, main h3, main h4, main h5, main h6, main p, main span {
            color: #ffffff !important;
          }

          /* 3. REVISI: Mengembalikan teks di dalam kotak Account (Total Balance) menjadi Hitam */
          main .bg-primary *, main [class*="bg-[#299D91]"] * {
            color: #000000 !important;
          }

          /* 4. REVISI: Teks Upcoming Bill (yang sebelumnya abu-abu gelap) dipaksa jadi putih/terang */
          main [class*="text-gray-700"], main [class*="text-gray-800"], main [class*="text-gray-900"] {
            color: #ffffff !important;
          }
          main [class*="text-gray-500"], main [class*="text-gray-400"] {
            color: #e5e7eb !important; /* Putih keabu-abuan agar tetap elegan */
          }

          /* 5. REVISI: Mengamankan panah merah dan hijau di Expenses Breakdown agar tidak ikut memutih/abu-abu */
          main [class*="text-red-"], main .text-red-500 {
            color: #ef4444 !important;
          }
          main [class*="text-green-"], main .text-green-500 {
            color: #22c55e !important;
          }

          /* 6. Memperjelas bayangan card di latar gelap */
          main [class*="shadow"] {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3) !important;
          }

          /* 7. Styling khusus tabel */
          main tr:nth-child(even) { background-color: #323232 !important; }
          main tr:nth-child(odd) { background-color: #2b2b2b !important; }
          main th { background-color: #1f1f1f !important; color: white !important; }
          
          /* 8. Merapikan border pembatas */
          main [class*="border-gray-"], main [class*="border-slate-"] {
            border-color: #3f3f3f !important;
          }

          /* 9. REVISI: Memisahkan Input text dan Select (Dropdown). Select dibuat gelap menyesuaikan tema */
          main input {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          main select {
            background-color: #2b2b2b !important;
            color: #ffffff !important;
            border: 1px solid #3f3f3f !important;
            border-radius: 6px;
            outline: none;
          }
        `}</style>
      )}

      <div className={`flex min-h-screen ${theme.name} ${isDarkMode ? "dark" : ""}`}>
        <aside className="bg-defaultBlack w-28 sm:w-64 text-special-bg2 flex flex-col justify-between px-7 py-12">   
          <div>
            <div className="mb-10">
              <Logo variant="secondary"/>
            </div>
            <nav>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${
                      isActive
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-special-bg3"
                    }`
                  }
                >
                  <div className="mx-auto sm:mx-0">{item.icon}</div>
                  <div className="ms-3 hidden sm:block">{item.name}</div>
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div>
            Themes
            <div className="flex flex-col sm:flex-row gap-2 items-center flex-wrap">
              {themes.map((t) => (
                <div
                  key={t.name}
                  className={`${t.bgcolor} w-6 h-6 rounded-md cursor-pointer mb-2`}
                  onClick={() => setTheme(t)}
                ></div>
              ))}
              
              <div 
                onClick={toggleDarkMode} 
                className="cursor-pointer text-special-bg2 hover:text-white mb-2 ms-0 sm:ms-1 flex items-center justify-center transition-transform hover:scale-110"
              >
                {isDarkMode ? (
                  <LightModeOutlinedIcon sx={{ fontSize: 20 }} />
                ) : (
                  <DarkModeOutlinedIcon sx={{ fontSize: 20 }} />
                )}
              </div>
            </div>
          </div>

          <div>
            <div onClick={handleLogout} className="cursor-pointer">
              <div className="flex bg-special-bg3 text-white px-4 py-3 rounded-md">
                <div className="mx-auto sm:mx-0 text-primary">
                  <Icon.Logout/>
                </div>
                <div className="ms-3 hidden sm:block">Logout</div>
              </div>
            </div>
            <div className="border my-10 border-b-special-bg"></div>
            <div className="flex justify-between items-center">
              <div>Avatar</div>
              <div className="hidden sm:block">
                {user?.name}
                <br />
                View Profile
              </div>
              <div className="hidden sm:block">
                <Icon.Detail size={15}/>
              </div>
            </div>
          </div>
        </aside>            
        
        <div className={`flex-1 flex flex-col transition-colors duration-200 ${isDarkMode ? "bg-[#191919] text-white" : "bg-special-mainBg"}`}>
          <header className={`border-b px-6 py-7 flex justify-between items-center ${isDarkMode ? "bg-[#191919] border-[#2b2b2b]" : "bg-white border-gray-05"}`}>     
            <div className="flex items-center">
              <div className="font-bold text-2xl me-6">{user?.name}</div> 
              <div className={`flex ${isDarkMode ? "text-gray-400" : "text-gray-03"}`}>
                <Icon.ChevronRight size={20}/>
                <span>May 19, 2023</span>
              </div> 
            </div>
            <div className="flex items-center">
              <div className="me-10">
                <NotificationsIcon className="text-primary scale-110"/>
              </div> 
              <Input backroundColor={isDarkMode ? "bg-[#2b2b2b]" : "bg-white"} border={isDarkMode ? "border-[#3f3f3f]" : "border-white"} />
            </div>
          </header>
          
          <main className="flex-1 px-6 py-4">{children}</main>
        </div>
      </div>

      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2 
        }}
        open={isLoggingOut}
      >
        <CircularProgress color="inherit" size={50} />
        <span className="text-white text-sm font-medium">Logging Out</span>
      </Backdrop>
    </>
  );
}

export default MainLayout;