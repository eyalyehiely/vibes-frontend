import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErorPic from '../images/404.png';
import { ArrowLeft } from 'lucide-react';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-10 shadow-default dark:border-strokedark dark:bg-boxdark sm:py-20">
      <div className="mx-auto max-w-[410px]">
        <img src={ErorPic} alt="ErorPic" />

        <div className="mt-7.5 text-center">
          <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">
            Sorry, the page can’t be found
          </h2>
          <p className="font-medium">
            The page you were looking for appears to have been moved, deleted, or does not exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-7.5 inline-flex items-center gap-2 rounded-md bg-yellow-500 py-3 px-6 font-medium text-white hover:bg-opacity-90"
          >
            <ArrowLeft size={20}/>
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;