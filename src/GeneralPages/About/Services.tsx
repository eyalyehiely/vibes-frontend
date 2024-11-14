import React from 'react';
import { Code, LineChart, Globe, Shield } from 'lucide-react';

const Services = () => {
  return (
    <section id="services" className="py-20 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What We Offer
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Comprehensive solutions tailored to your business needs
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="h-12 w-12 text-purple-600 mb-4">
              <Code />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Web Development</h3>
            <p className="text-gray-500">Custom websites and applications built with the latest technologies.</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="h-12 w-12 text-purple-600 mb-4">
              <LineChart />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Data Analytics</h3>
            <p className="text-gray-500">Transform your data into actionable insights for better decision making.</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="h-12 w-12 text-purple-600 mb-4">
              <Globe />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Digital Marketing</h3>
            <p className="text-gray-500">Reach your target audience and grow your online presence.</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="h-12 w-12 text-purple-600 mb-4">
              <Shield />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Cybersecurity</h3>
            <p className="text-gray-500">Protect your business with advanced security solutions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;