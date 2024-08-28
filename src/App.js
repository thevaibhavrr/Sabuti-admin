import './App.css';
import { Route, Routes } from "react-router-dom"; 
import Admin from './AdminPages/Admin';
import LoginForm from './auth/login';
import ForgotPasswordForm from './auth/sendMail';
import OtpVerifiedForm from './auth/otp';

function App() {
  return (
    <div>
       <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Forgot-Password" element={<ForgotPasswordForm />} />
        <Route path="/otp-verified" element={<OtpVerifiedForm />} />
       <Route
					path="/admin/*"
					element={<Admin />}
				/>
      </Routes>
    </div>
  );
}

export default App;

