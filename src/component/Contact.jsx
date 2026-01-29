import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Contact Us
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Have questions or feedback? We’d love to hear from you!
        </p>

        <form className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          📧 abdurrahimdm999@gmail.com &nbsp; | &nbsp; 📞 +91 000 0000 000
        </div>
      </div>
    </div>
  );
};

export default Contact;
