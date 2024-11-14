import React, { useState } from 'react';
import completeProfileUsingGoogle  from '../functions/auth/completeProfileUsingGoogle';
import Rights from "../../components/Rights";
import checkTalentToken from '../functions/auth/checkTalentToken'

const CompleteProfile: React.FC = () => {
  checkTalentToken()
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    birth_date: '',
    phone_number: '',
  });

  const token = localStorage.getItem('authTokens')
    ? JSON.parse(localStorage.getItem('authTokens')).access
    : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const validateForm = () => {
    if (!formData.gender || !formData.birth_date || !formData.phone_number) {
      alert('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await completeProfileUsingGoogle(formData, token);
      if (res.success) {
        window.location.href = '/talent/home';
      } else {
        alert('Failed to complete profile.');
      }
    } catch (error) {
      alert(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-purple-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={"/favicon.ico"} alt="Logo" className="w-24" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">Complete Your Profile</h2>

          {step === 1 && (
            <div className="mb-4">
              <label className="block text-purple-700 font-medium mb-2">
                Gender:
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-purple-300 rounded-md p-2 focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="mb-4">
              <label className="block text-purple-700 font-medium mb-2">
                Birth Date:
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-purple-300 rounded-md p-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="mb-4">
              <label className="block text-purple-700 font-medium mb-2">
                Phone Number:
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-purple-300 rounded-md p-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </label>
            </div>
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
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
        <Rights />
      </div>
    </div>
  );
};

export default CompleteProfile;