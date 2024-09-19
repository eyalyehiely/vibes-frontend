import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoDark from "../../images/logo/logo-dark.svg";
import Logo from "../../images/logo/logo.svg";
import Rights from "../../components/Rights";
import talentSignup from "../functions/auth/talentSignup";

const TalentSignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "Male",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordValid) {
      talentSignup(formData); // Pass formData to the signup function
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

    // Set overall password validity
    setIsPasswordValid(
      strength.length &&
      strength.uppercase &&
      strength.lowercase &&
      strength.digit &&
      strength.specialChar
    );
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>
              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to Talent-Bridge
              </h2>

              <form onSubmit={handleSubmit}>
                {/* First Name */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    First Name<span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Last Name<span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                {/* Gender */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Gender<span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Email */}
                <div className="relative mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email<span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password<span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                    <div className="mt-2">
                      <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      <label
                        htmlFor="showPassword"
                        className="ml-2 text-sm font-medium"
                      >
                        Show password
                      </label>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-black dark:text-white">
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
                  {/* Overall Password Validity Indicator */}
                  <div className="mt-2">
                    {isPasswordValid ? (
                      <p className="text-green-600 font-bold">Password is strong.</p>
                    ) : (
                      <p className="text-red-600 font-bold">Password does not meet all requirements.</p>
                    )}
                  </div>
                </div>

                {/* Accept Terms and Conditions */}
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    I accept terms and conditions
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="checkbox"
                    id="accept_terms"
                    checked={formData.accept_terms}
                    onChange={handleCheckboxChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create account"
                    className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 ${
                      !isPasswordValid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!isPasswordValid}
                  />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link to="/auth/talent/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <Rights />
        </div>
      </div>
    </>
  );
};

export default TalentSignUp;