"use client"

import React, { useState } from "react";
import { searchProperties } from "@/store/propertySlice"; // Replace with your actual Redux action import
import Store from "@/store/store";

import { useRouter } from 'next/navigation';


const Search = () => {
  const [filters, setFilters] = useState({
    location: "",
    status: "",
    type: "",
  });
  
  const router = useRouter();
  const handleSearch = () => {
    // Dispatch the Redux action with the selected filters as an object
     Store.dispatch(searchProperties(filters));

     router.push('/search');
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Only make it able if a value is selected
  const isSearchDisabled = Object.values(filters).every(value => value === '');

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-4xl mt-10 mx-auto">
      <select
        name="location"
        value={filters.location}
        onChange={handleChange}
        className="flex-grow p-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select Location
        </option>
        <option value="colombo">Colombo</option>
        <option value="galle">Galle</option>
        <option value="kandy">Kandy</option>
      </select>

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="flex-grow p-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select Status
        </option>
        <option value="for sale">For Sale</option>
        <option value="for rent">For Rent</option>
      </select>

      <select
        name="type"
        value={filters.type}
        onChange={handleChange}
        className="flex-grow p-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select Property Type
        </option>
        <option value="single family">Single Family</option>
        <option value="villa">Villa</option>
      </select>

      <button
        onClick={handleSearch}
        disabled={isSearchDisabled}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
