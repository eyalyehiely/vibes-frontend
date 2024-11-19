import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rights from "../components/Rights";
import signin from "../generalFunctions/auth/signin";
import GoogleSignIn from "../Talents/components/GoogleSignIn";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(formData); // Pass formData to the signup function
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-purple-50">
        <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg sm:p-8">
          <div className="hidden w-full xl:block xl:w-full">
            <div className="px-26 py-17.5 text-center">
              <div className="mb-5.5 flex max-h-24 items-center justify-center overflow-hidden">
                <img
                  className="h-16 w-auto dark:hidden" // Adjust height as needed to fit properly
                  src="/favicon.ico"
                  alt="Logo"
                />
              </div>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-full xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Talent-Bridge
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="relative mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email<span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                    <CiMail
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform text-purple-500"
                      size={20}
                    />
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
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                    <IoLockClosedOutline
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform text-purple-500"
                      size={20}
                    />
                  </div>
                  <div className="mt-2 flex items-center">
                    <input
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="mr-2"
                    />
                    <label
                      htmlFor="showPassword"
                      className="text-sm font-medium"
                    >
                      Show password
                    </label>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg bg-purple-500 p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                {/* Google sign in */}
                <GoogleSignIn />

                <div className="mt-6 text-center">
                  <hr />
                  <br />
                  <p>
                    Talent? Don’t have an account?{" "}
                    <Link to="/auth/talent/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>

                  <p>
                    Company? Don’t have an account?{" "}
                    <Link to="/auth/company/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
                <br />
                <hr />
                <div className="mt-6 text-center">
                  <p>
                    Forgot your password?{" "}
                    <Link to="/auth/reset-password" className="text-primary">
                      Click here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Rights />
    </>
  );
};

export default SignIn;
