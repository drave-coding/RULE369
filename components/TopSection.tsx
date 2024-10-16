"use client";

import React from 'react';
import { FaPlus } from 'react-icons/fa'; // Import the plus icon from react-icons

const TopSection = () => {
  return (
    <div className="flex flex-col w-full h-[66.67%]  rounded-lg pt-6 pb-14">
      {/* Search Box Section */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/5 border border-gray-300 rounded-lg p-1.5"
        />
      </div>
      
      
      <div className="flex justify-between items-end">
        <div></div> {/* Empty div for spacing */}
        <button className="bg-transparent border border-purple-500 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white active:scale-95 flex items-center shadow-md">
          <FaPlus className="mr-2" /> {/* Plus icon */}
          Add Project
        </button>
      </div>
      
      {/* Horizontal Line */}
      <hr className="mt-4 border-t-2 border-white" />
    </div>
  );
};

export default TopSection;
