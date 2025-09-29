"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import AiSidebar from "./AiSidebar";
import CartSidebar from "./CartSidebar";
import { useCart } from "@/context/CartContext";
interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalCount, addItem } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    onSearch(query);
  };
  /*  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); */

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-100 shadow-md gap-4">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 w-1/4">
        <button
          className="cursor-pointer"
          onClick={() => window.location.reload()}
        >
          Gebeya
        </button>
      </h1>

      <div className=" w-2/4  sm:w-1/2 md:w-1/3 lg:w-1/4 flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 outline-none w-full"
        />

        <button
          onClick={handleSearch}
          className="p-2 bg-gray-200 hover:bg-gray-300"
        >
          <Image src="/search.svg" alt="Search" width={23} height={23} />
        </button>
      </div>
      <div className="flex gap-7 w-1/4 ">
        <div className="relative group">
          <button>
            <Image
              className=" mr-4 cursor-pointer"
              src="/user.svg"
              alt="user"
              width={50}
              height={50}
            />
          </button>

          <div className="absolute  right-0 mt-0.5 w-40 bg-white text-black shadow-lg rounded opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
            <Link
              href="/controller/login"
              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              Sign In
            </Link>
            <a
              href="/controller/register"
              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              Register
            </a>
          </div>
        </div>
        <button className="relative" onClick={() => setCartOpen(true)} aria-label="Open Cart">
          <Image src="/cart.svg" alt="cart" width={50} height={50} />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </button>
        <button onClick={() => setAiOpen(true)} aria-label="Open Help Assistant">
          <Image src="/badge-question-mark.svg" alt="help" width={50} height={50} />
        </button>
      </div>
      <AiSidebar open={aiOpen} onClose={() => setAiOpen(false)} />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default SearchBar;
