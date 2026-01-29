import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          About Us
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Welcome to our food delivery app inspired by Swiggy.  
          This project is built to practice modern frontend development using
          React, Redux Toolkit, and Tailwind CSS.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4 rounded-xl bg-gray-100">
            <h2 className="font-semibold text-lg text-gray-800">
              🚀 Fast
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Optimized UI with smooth user experience.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-100">
            <h2 className="font-semibold text-lg text-gray-800">
              🍔 Variety
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Multiple restaurants & cuisines.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-100">
            <h2 className="font-semibold text-lg text-gray-800">
              💳 Easy Cart
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Redux-powered cart management.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Built with ❤️ using React & Tailwind CSS
        </p>
      </div>
    </div>
  );
};

export default About;
