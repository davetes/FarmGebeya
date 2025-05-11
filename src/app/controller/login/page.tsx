"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Select from "react-select"; // Import react-select

export default function AuthModal() {
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]); // State to store the list of countries
  const [selectedCountry, setSelectedCountry] = useState<string>("Ethiopia"); // Default country

  // Fetch countries from an API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all"); // Using fetch to get countries
        const data = await response.json(); // Parse the JSON response
        const countryNames = data.map((country: any) => ({
          value: country.name.common,
          label: country.name.common,
        })); // Format data for react-select
        setCountries(countryNames); // Update the state with the country names
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Handle selection change
  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg p-6 relative shadow-lg">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-xl">&times;</button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-1">Register/Sign in</h2>
        <p className="text-sm text-green-600 flex items-center gap-2 mb-4">
          ✅ Your information is protected
        </p>

        {/* Promo Banner */}
        <div className="bg-pink-100 text-red-600 text-sm p-2 rounded mb-4">
          <span className="font-semibold">
            🏷 New shoppers get up to 70% off
          </span>
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-4 py-2 mb-4"
        />

        {/* Continue Button */}
        <button className="bg-pink-300 text-white font-semibold w-full py-2 rounded mb-4">
          Continue
        </button>

        {/* Trouble Signing In */}
        <p className="text-center text-sm text-gray-500 mb-4 hover:underline cursor-pointer">
          Trouble signing in?
        </p>

        {/* Divider */}
        <div className="flex items-center mb-4">
          <hr className="flex-grow border-t" />
          <span className="px-2 text-sm text-gray-500">Or continue with</span>
          <hr className="flex-grow border-t" />
        </div>

        {/* Social Icons */}
        <div className="flex justify-between px-4 mb-4">
          <Image src="/google-icon.svg" alt="Google" width={30} height={30} />
          <Image
            src="/facebook-icon.svg"
            alt="Facebook"
            width={30}
            height={30}
          />
          <Image src="/x-icon.svg" alt="X" width={30} height={30} />
          <Image src="/apple-icon.svg" alt="Apple" width={30} height={30} />
        </div>

        {/* Location Info with React Select */}
        <div className="text-sm text-center text-gray-600">
          <Select
            options={countries} // Pass the country options
            value={{ value: selectedCountry, label: selectedCountry }} // Default selected value
            onChange={handleCountryChange} // Handle country change
            className="w-full mb-4" // Make the select full width
            placeholder="Select your country"
          />
          <p className="mt-2">
            Location: <span className="font-semibold">{selectedCountry} ⌄</span>
          </p>
        </div>
      </div>
    </div>
  );
}
