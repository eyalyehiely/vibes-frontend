import React, { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import LogoDark from "../images/logo/logo-dark.svg";
import Logo from "../images/logo/logo.svg";
import changePassword from "../generalFunctions/auth/changePassword";

const ChangePassword = () => {
  const { token } = useParams(); // Extract token from the URL path
  const [searchParams] = useSearchParams(); // Get query params from the URL
  const email = searchParams.get("email");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Function to validate password strength
  const validatePasswordStrength = (password) => {
    const strength = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    };
    setPasswordStrength(strength);

    // Set overall password validity
    setIsPasswordValid(Object.values(strength).every(Boolean));
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    validatePasswordStrength(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && newPassword && isPasswordValid) {
      changePassword(token, email, newPassword);
      console.log("email", email, newPassword); // Pass token, email, and newPassword to the changePassword function
    } else {
      console.error(
        "Please fill in all required fields and ensure password meets criteria."
      );
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full border-stroke dark:border-strokedark xl:block xl:w-1/2 xl:border-r-2">
          <div className="px-26 py-17.5 text-center">
            <Link className="mb-5.5 inline-block" to="#">
              <img className="hidden dark:block" src={Logo} alt="Logo" />
              <img className="dark:hidden" src={LogoDark} alt="Logo" />
            </Link>
            <p className="2xl:px-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              suspendisse.
            </p>
          </div>
        </div>
        <div className="w-full xl:w-1/2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Reset Password
            </h2>
            <p className="mb-7.5">
              Enter your email address and your new password.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={email}
                    readOnly
                  />
                  <span className="absolute right-4 top-4">
                    {/* SVG for the email icon */}
                  </span>
                </div>
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
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={newPassword}
                    onChange={handlePasswordChange}
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
                  <div className="mt-2">
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
                        passwordStrength.digit
                          ? "text-green-600"
                          : "text-red-600"
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
                      • At least one special character (!@#$%^&*)
                    </p>
                  </div>
                  <span className="absolute right-4 top-4">
                    {/* SVG for the eye icon */}
                  </span>
                </div>
              </div>

              <div>
                <input
                  type="submit"
                  value="Change Password"
                  className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 ${
                    isPasswordValid ? "" : "cursor-not-allowed opacity-50"
                  }`}
                  disabled={!isPasswordValid}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
