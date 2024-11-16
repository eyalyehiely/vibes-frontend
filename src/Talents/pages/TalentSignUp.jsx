import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Rights from "../../components/Rights";
import talentSignup from "../functions/auth/talentSignup";
import swal from "sweetalert";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

const steps = [
  { number: 1, label: "Personal Details" },
  { number: 2, label: "User & Terms" },
];

const TalentSignUp = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "Male",
    birth_date: "",
    email: "",
    password: "",
    accept_terms: false,
    license_type: "Talent",
    user_type: "Talent",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "password") {
      validatePasswordStrength(value);
    }
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData({ ...formData, [id]: checked });
  };

  const handleNext = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const validateForm = () => {
    const requiredFields = [
      "first_name",
      "last_name",
      "gender",
      "birth_date",
      "email",
      "password",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        swal("Please fill in all required fields.");
        return false;
      }
    }
    if (!formData.accept_terms) {
      swal("You must accept the terms and conditions.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordValid) {
      talentSignup(formData);
    } else {
      swal("Please ensure your password meets all the requirements.");
    }
  };

  const validatePasswordStrength = (password) => {
    const strength = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /[!@#$%^&*()_\-+=\[\]{};:,.<>?/]/.test(password),
    };

    setPasswordStrength(strength);

    setIsPasswordValid(
      strength.length &&
        strength.uppercase &&
        strength.lowercase &&
        strength.digit &&
        strength.specialChar
    );
  };

  return (
    <div className="flex h-screen items-center justify-center bg-purple-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg sm:p-8">
        <Link to="/signin" className="text-purple-700 hover:text-purple-500">
          <ArrowLeft className="ml-2 h-5 w-5" />
        </Link>
        <div className="mb-6 flex justify-center">
          <img
            src={"/favicon.ico"}
            alt="Logo"
            className="h-auto w-20 max-w-full md:w-24"
          />
        </div>

        <div className="mb-8 flex flex-col items-center justify-between sm:flex-row">
          {steps.map((s, index) => (
            <div
              key={s.number}
              className="mb-2 w-full flex-1 sm:mb-0 sm:w-auto"
            >
              <div
                className={`rounded-full p-2 text-center ${
                  step === s.number
                    ? "bg-purple-700 text-white"
                    : "bg-purple-200 text-purple-700"
                }`}
              >
                {s.label}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`hidden h-1 sm:block ${
                    step > s.number ? "bg-purple-700" : "bg-purple-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-purple-700">
            Talent Sign Up
          </h2>

          {step === 1 && (
            <div className="mb-4">
              <label className="mb-2 block font-medium text-purple-700">
                First Name:
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-purple-300 p-2 focus:border-purple-500 focus:ring-purple-500"
                />
                <CiUser
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-purple-500"
                  size={20}
                />
              </div>

              <label className="mb-2 block font-medium text-purple-700">
                Last Name:
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-purple-300 p-2 focus:border-purple-500 focus:ring-purple-500"
                />

                <CiUser
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-purple-500"
                  size={20}
                />
              </div>
              <label className="mb-2 block font-medium text-purple-700">
                Birth Date:
                <input
                  type="date"
                  id="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-purple-300 p-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </label>
              <label className="mb-2 block font-medium text-purple-700">
                Gender:
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-purple-300 p-2 focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="mb-4">
              <label className="mb-2 block font-medium text-purple-700">
                Email:
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-purple-300 p-2 focus:border-purple-500 focus:ring-purple-500"
                />
                <CiMail
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-purple-500"
                  size={20}
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block font-medium text-purple-700">
                  Password<span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-purple-300 p-2 pl-10 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <IoLockClosedOutline
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-purple-500"
                    size={20}
                  />
                </div>

                {/* Show Password Checkbox */}
                <div className="mt-2 flex items-center">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  />
                  <label htmlFor="showPassword" className="text-sm font-medium">
                    Show password
                  </label>
                </div>

                {/* Password Strength Indicators */}
                <div className="mt-2 text-sm">
                  <p
                    className={
                      passwordStrength.length
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    • At least 8 characters
                  </p>
                  <p
                    className={
                      passwordStrength.uppercase
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    • At least one uppercase letter (A-Z)
                  </p>
                  <p
                    className={
                      passwordStrength.lowercase
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    • At least one lowercase letter (a-z)
                  </p>
                  <p
                    className={
                      passwordStrength.digit ? "text-green-600" : "text-red-600"
                    }
                  >
                    • At least one digit (0-9)
                  </p>
                  <p
                    className={
                      passwordStrength.specialChar
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    • At least one special character (!@#$%^&*() etc.)
                  </p>
                </div>

                {/* Password Validity Message */}
                <div className="mt-2">
                  {isPasswordValid ? (
                    <p className="font-bold text-green-600">
                      Password is strong.
                    </p>
                  ) : (
                    <p className="text-red-600 font-bold">
                      Password does not meet all requirements.
                    </p>
                  )}
                </div>
              </div>
              <label className="mb-2 block font-medium text-purple-700">
                I accept terms and conditions:
                <input
                  type="checkbox"
                  id="accept_terms"
                  checked={formData.accept_terms}
                  onChange={handleCheckboxChange}
                  required
                  className="ml-2"
                />
              </label>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
              >
                Previous
              </button>
            )}
            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className={`rounded-md bg-purple-700 px-4 py-2 text-white hover:bg-purple-800 ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
      <Rights />
    </div>
  );
};

export default TalentSignUp;
