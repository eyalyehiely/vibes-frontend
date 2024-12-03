import React, { useState } from "react";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { OTPInput } from "../components/OTPInput";
import sendOtp from "../../generalFunctions/auth/sendOtp";
import verifyOtp from "../../generalFunctions/auth/verifyOtp";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("נא להזין כתובת דואר אלקטרוני");
      return;
    }

    try {
      const response = await sendOtp(email);
      toast.success("קוד האימות נשלח לדואר האלקטרוני שלך");
      setStep("otp"); 
    } catch (error) {
      console.error("error message:", error.message);
      toast.error(error.message); // Display detailed error message
      if (error.message === "משתמש לא קיים") {
        console.log("Redirecting to /signup");
        navigate("/signup"); // Redirect using React Router
      }
    }
  };

  const handleOTPSubmit = async (otp) => {
    try {
      const response = verifyOtp(email, otp); // Use the verifyOtp function
      if (response.success) {
        toast.success("התחברת בהצלחה!");
      } else {
        toast.error(response.data.detail || "Verification failed");
      }
    } catch (error) {
      toast.error("שגיאה באימות קוד האימות");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-primary/10 bg-white/80 p-8 shadow-xl backdrop-blur-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
              <Lock className="text-white" size={24} />
            </div>
            <h1 className="text-gray-800 text-2xl font-bold">ברוכים הבאים</h1>
            <p className="text-gray-600 mt-2">
              {step === "email"
                ? "התחבר באמצעות הדואר האלקטרוני שלך"
                : "הזן את קוד האימות שנשלח לדואר האלקטרוני שלך"}
            </p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="relative">
                <Mail
                  className="text-gray-400 absolute right-3 top-3"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 w-full rounded-lg border py-2 pl-4 pr-10 text-right outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="דואר אלקטרוני"
                  dir="rtl"
                />
              </div>
              <button
                type="submit"
                id="submitButton"
                className="w-full rounded-lg bg-gradient-to-l from-primary to-secondary py-3 font-medium text-white transition-opacity hover:opacity-90"
              >
                שלח קוד אימות
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <OTPInput onComplete={handleOTPSubmit} />
              <button
                onClick={() => setStep("email")}
                className="text-gray-600 mx-auto flex items-center gap-2 transition-colors hover:text-primary"
              >
                <ArrowLeft size={16} />
                <span>חזור להזנת דואר אלקטרוני</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
