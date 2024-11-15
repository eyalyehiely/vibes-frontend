import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rights from "../../components/Rights";
import talentSignup from "../functions/auth/talentSignup";

const steps = [
  { number: 1, label: "Basic Info" },
  { number: 2, label: "Personal Details" },
  { number: 3, label: "Account Info" },
  { number: 4, label: "Terms & Conditions" }
];

const TalentSignUp = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "Male",
    birth_date: '',
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
    const requiredFields = ["first_name", "last_name", "gender", "birth_date", "email", "password"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert('Please fill in all required fields.');
        return false;
      }
    }
    if (!formData.accept_terms) {
      alert('You must accept the terms and conditions.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordValid) {
      talentSignup(formData);
    } else {
      alert("Please ensure your password meets all the requirements.");
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
    <div className="h-screen flex items-center justify-center bg-purple-50">
      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={'/favicon.ico'} alt="Logo" className="w-20 md:w-24 max-w-full h-auto" />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          {steps.map((s, index) => (
            <div key={s.number} className="w-full sm:w-auto flex-1 mb-2 sm:mb-0">
              <div
                className={`text-center p-2 rounded-full ${
                  step === s.number ? "bg-purple-700 text-white" : "bg-purple-200 text-purple-700"
                }`}
              >
                {s.label}
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden sm:block h-1 ${step > s.number ? "bg-purple-700" : "bg-purple-200"}`}></div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
            Talent Sign Up
          </h2>

          {step === 1 && (
            <div className="mb-4">
              <label className="block text-purple-700 font-medium mb-2">
                First Name:
                <input
                  type="text"
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-purple-300 rounded-md p-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </label>
              <label className="block text-purple-700 font-medium mb-2">
                Last Name:
                <input
                  type="text"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-purple-300 rounded-md p-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="mb-4">
              <label className="block text-purple-700 font-medium mb-2">
                Birth Date:
                <input
                  type="date"
                  id="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-purple-300 rounded-md p-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </label>
              <label className="block text-purple-700 font-medium mb-2">
                Gender:
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-purple-300 rounded-md p-2 focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="mb-4">
              <label className="block text-purple-700 font-medium mb-2">
                Email:
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-purple-300 rounded-md p-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </label>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-purple-700">
                  Password<span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-purple-300 p-2 focus:border-purple-500 focus:ring-purple-500"
                  />
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
                  <div className="mt-2 text-sm">
                    <p className={passwordStrength.length ? "text-green-600" : "text-red-600"}>
                      • At least 8 characters
                    </p>
                    <p className={passwordStrength.uppercase ? "text-green-600" : "text-red-600"}>
                      • At least one uppercase letter (A-Z)
                    </p>
                    <p className={passwordStrength.lowercase ? "text-green-600" : "text-red-600"}>
                      • At least one lowercase letter (a-z)
                    </p>
                    <p className={passwordStrength.digit ? "text-green-600" : "text-red-600"}>
                      • At least one digit (0-9)
                    </p>
                    <p className={passwordStrength.specialChar ? "text-green-600" : "text-red-600"}>
                      • At least one special character (!@#$%^&*() etc.)
                    </p>
                  </div>
                  <div className="mt-2">
                    {isPasswordValid ? (
                      <p className="text-green-600 font-bold">Password is strong.</p>
                    ) : (
                      <p className="text-red-600 font-bold">Password does not meet all requirements.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="mb-4">
              <label className="block text-purple-700 font-medium mb-2">
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

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className={`px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
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