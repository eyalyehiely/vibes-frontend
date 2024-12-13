// import React, { useState } from 'react';
// import completeProfileUsingGoogle from '../functions/auth/completeProfileUsingGoogle';
// import Rights from "../../components/Rights";
// import swal from 'sweetalert'
// const CompleteProfile: React.FC = () => {

//   const [step, setStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     gender: '',
//     birth_date: '',
//     phone_number: '',
//     accept_terms: false,
//   });

//   const token = localStorage.getItem('authTokens')
//     ? JSON.parse(localStorage.getItem('authTokens')).access
//     : null;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
  
//     // Type guard for handling 'checked' only for HTMLInputElement
//     if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
//       setFormData({
//         ...formData,
//         [name]: e.target.checked, // Access 'checked' safely
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleNext = () => {
//     if (step < 2) setStep(step + 1);
//   };

//   const handlePrevious = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const validateForm = () => {
//     if (!formData.gender || !formData.birth_date || !formData.phone_number || !formData.accept_terms) {
//       swal('Please fill in all required fields and accept terms.');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       setIsLoading(false);
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const res = completeProfileUsingGoogle(formData, token);
//       if (res && res.success) {
//         window.location.href = '/talent/home';
//       } else {
//         swal('Failed to complete profile.');
//       }
//     } catch (error) {
//       console.error('Submission error:', error); // Add this for better debugging
//       swal('An error occurred while submitting the form.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
    
//     <div className="h-screen flex items-center justify-center bg-purple-50">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         {/* Step Indicator */}
//         <div className="flex mb-6">
//           <div className={`flex-1 text-center p-2 rounded ${step === 1 ? 'bg-purple-700 text-white' : 'bg-purple-200 text-purple-700'}`}>
//             Step 1
//           </div>
//           <div className={`flex-1 text-center p-2 rounded ${step === 2 ? 'bg-purple-700 text-white' : 'bg-purple-200 text-purple-700'}`}>
//             Step 2
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">Complete Your Profile</h2>

//           {step === 1 && (
//             <div className="mb-4">
//               <label className="block text-purple-700 font-medium mb-2">
//                 Gender:
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full border border-purple-300 rounded-md p-2 focus:border-purple-500 focus:ring-purple-500"
//                 >
//                   <option value="">Select</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </label>
//               <label className="block text-purple-700 font-medium mb-2">
//                 Birth Date:
//                 <input
//                   type="date"
//                   name="birth_date"
//                   value={formData.birth_date}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full border border-purple-300 rounded-md p-2 focus:border-purple-500 focus:ring-purple-500"
//                 />
//               </label>
//               <label className="block text-purple-700 font-medium mb-2">
//                 Phone Number:
//                 <input
//                   type="tel"
//                   name="phone_number"
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full border border-purple-300 rounded-md p-2 focus:border-purple-500 focus:ring-purple-500"
//                 />
//               </label>
//             </div>
//           )}

//           {step === 2 && (
//             <div className="mb-4">
//               <label className="block text-purple-700 font-medium mb-2">
//                 I accept terms and conditions:
//                 <input
//                   type="checkbox"
//                   name="accept_terms"
//                   checked={formData.accept_terms}
//                   onChange={handleChange}
//                   required
//                   className="ml-2"
//                 />
//               </label>
//             </div>
//           )}

//           <div className="flex justify-between">
//             {step > 1 && (
//               <button
//                 type="button"
//                 onClick={handlePrevious}
//                 className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
//               >
//                 Previous
//               </button>
//             )}
//             {step < 2 ? (
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 ml-auto"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 className={`px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 ${
//                   isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Submitting...' : 'Submit'}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//       <Rights />
//     </div>
//   );
// };

// export default CompleteProfile;