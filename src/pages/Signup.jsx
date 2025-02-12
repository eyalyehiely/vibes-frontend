import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Rights from "../components/Rights";
import signup from "../utils/auth/signup";
import swal from "sweetalert";
import { CiUser } from "react-icons/ci";
import { TiPhoneOutline } from "react-icons/ti";

const steps = [{ number: 1, label: "פרטים אישיים" }];

const Signup = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "זכר",
    birth_date: "",
    email: location.state?.email || "",
    accept_terms: false,
  });

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData({ ...formData, [id]: checked });
  };

  // Validate form fields
  const validateForm = () => {
    const requiredFields = [
      "first_name",
      "last_name",
      "gender",
      "birth_date",
      "email",
      "accept_terms",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        swal("נא למלא את כל השדות הנדרשים.");
        return false;
      }
    }

    if (!validateEmail(formData.email)) {
      swal("כתובת דואר אלקטרוני אינה חוקית.");
      return false;
    }

    if (!formData.accept_terms) {
      swal("אנא אשרו את תנאי השימוש.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await signup(formData);
      swal("הרשמה הושלמה בהצלחה!");
      navigate("/"); // Redirect after successful signup
    } catch (error) {
      swal(error.response?.data?.detail || "שגיאה בהרשמה. נסו שנית.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg sm:p-10">
        <Link to="/login" className="text-pink-600 hover:text-pink-400">
          <ArrowLeft className="ml-2 h-6 w-6" />
        </Link>
        <div className="mb-6 flex justify-center">
          {/* Optional image or logo */}
        </div>

        <div className="mb-1 flex flex-col items-center">
          {steps.map((s, index) => (
            <div
              key={s.number}
              className="mb-2 w-full text-center text-lg font-medium"
            >
              <div
                className={`rounded-full px-4 py-2 text-white ${
                  step === s.number
                    ? "bg-gradient-to-r from-pink-500 to-orange-500"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {s.label}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mt-2 h-1 w-full ${
                    step > s.number ? "bg-pink-400" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg bg-gradient-to-b from-blue-50 to-pink-50 p-6"
          dir="rtl"
        >
          <h2 className="mb-6 text-center text-3xl font-bold text-pink-600">
            הרשמה
          </h2>

          <div>
            <label className="mb-2 block text-lg font-semibold text-pink-600">
              :שם פרטי
            </label>
            <div className="relative">
              <input
                type="text"
                id="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-pink-300 p-3 focus:border-pink-500 focus:ring-pink-500"
              />
              <CiUser
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-pink-400"
                size={24}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-lg font-semibold text-pink-600">
              :שם משפחה
            </label>
            <div className="relative">
              <input
                type="text"
                id="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-pink-300 p-3 focus:border-pink-500 focus:ring-pink-500"
              />
              <CiUser
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-pink-400"
                size={24}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-lg font-semibold text-pink-600">
              כתובת דוא"ל:
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-pink-300 p-3 focus:border-pink-500 focus:ring-pink-500"
              />
              <TiPhoneOutline
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-pink-400"
                size={24}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-lg font-semibold text-pink-600">
              :תאריך לידה
            </label>
            <input
              type="date"
              id="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-pink-300 p-3 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-lg font-semibold text-pink-600">
              :מגדר
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-pink-300 p-3 focus:border-pink-500 focus:ring-pink-500"
            >
              <option value="זכר">זכר</option>
              <option value="נקבה">נקבה</option>
              <option value="אחר">אחר</option>
            </select>
          </div>

          <div>
            <label className="flex cursor-pointer items-center text-lg font-semibold text-pink-600">
              <input
                type="checkbox"
                id="accept_terms"
                checked={formData.accept_terms}
                onChange={handleCheckboxChange}
                required
                className="ml-2 accent-pink-500"
              />
              אני מאשר את תנאי השימוש באפליקציה
            </label>
          </div>

          <button
            type="submit"
            className={`w-full rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "בתהליך..." : "קדימה תרשמו אותי"}
          </button>
        </form>
      </div>
      <Rights />
    </div>
  );
};

export default Signup;
