import React, { useContext, useState } from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import FormSignIn from "../components/Fragments/FormSignIn";
import { loginService } from "../services/authService";
import { AuthContext } from "../context/authContext";
import AppSnackbar from "../components/Elements/AppSnackbar";
import { DarkModeContext } from "../context/darkModeContext"; 
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

function signIn() {
  const { login } = useContext(AuthContext);

  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  }); 
  
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = async (email, password) => {
    try {
      const { refreshToken } = await loginService(email, password);
      login(refreshToken); 
    } catch (err) {
      setSnackbar({ open: true, message: err.msg, severity: "error" });
    }
  };

  return (
    <>
      {isDarkMode && (
        <style>{`
          body, html, .min-h-screen, 
          [class*="bg-white"], 
          [class*="bg-gray-"], 
          [class*="bg-slate-"], 
          [class*="bg-neutral-"], 
          [class*="bg-zinc-"] {
            background-color: #2d2d2d !important;
            color: white !important;
          }
          
          {/* Memberikan warna background gelap yang solid khusus pada teks pemisah agar memotong garis dengan sempurna */}
          .dark span, 
          div[class*="border-"] + span,
          div[class*="after:"] span,
          p.text-gray-500,
          span {
            background-color: #2d2d2d !important;
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }

          /* KECUALI UNTUK INPUT: Menjaga kotak input tetap putih agar teks ketikan user terlihat jelas */
          input {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
        `}</style>
      )}

      <div className={`min-h-screen flex flex-col justify-center transition-colors duration-200 ${isDarkMode ? "bg-[#2d2d2d] text-white dark" : "bg-white"}`}>
        <AuthLayout>
          <FormSignIn onSubmit={handleLogin} />

          <div className="flex justify-center mt-6">
            <div 
              onClick={toggleDarkMode} 
              className={`cursor-pointer p-2 rounded-full transition-transform hover:scale-110 ${isDarkMode ? "text-white" : "text-black"}`}
            >
              {isDarkMode ? (
                <LightModeOutlinedIcon sx={{ fontSize: 24 }} />
              ) : (
                <DarkModeOutlinedIcon sx={{ fontSize: 24 }} />
              )}
            </div>
          </div>

          <AppSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={handleCloseSnackbar}
          />
        </AuthLayout>
      </div>
    </>
  );
}

export default signIn;