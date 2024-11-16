


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sendResetPasswordLink from '../generalFunctions/auth/sendResetPasswordLink';
import Rights from "../components/Rights";
import { CiMail } from "react-icons/ci";


const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendResetPasswordLink(email);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purple-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg border border-stroke dark:border-strokedark dark:bg-boxdark">
          <div className="w-full xl:w-full">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Reset Password
              </h2>
              <p className="mb-7.5">
                Enter your email address to receive a password reset link.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id='email'
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <CiMail
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-purple-500"
                    size={24}
                  />
                  </div>
                </div>
                <div>
                  <input
                    type="submit"
                    value="Send Password Reset Link"
                    className="w-full cursor-pointer rounded-lg border border-purple bg-purple-500 p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
              </form>
            </div>
          </div>

      </div>
      <Rights />
    </div>
  );
};

export default ResetPassword;