"use client";

import React, { useState } from "react";
import { data } from "@/data/description";
import Image from "next/image";
import SearchBar from "@/components/searchBar";
import Link from "next/link";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { useRef } from "react";
type DataType = typeof data;

export default function GalleryPage() {
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const router = useRouter();
  const handleClick = () => {
    router.push("/components/footer");
  };
  const [filteredData, setFilteredData] = useState<DataType>(data);

  const handleSearch = (query: string) => {
    const newFilteredData: DataType = {} as DataType;

    Object.entries(data).forEach(([category, items]) => {
      const matchedItems = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          category.toLowerCase().includes(query.toLowerCase())
      );

      if (matchedItems.length > 0) {
        // @ts-ignore — TS may complain about dynamic category keys; this is safe here
        newFilteredData[category] = matchedItems;
      }
    });

    setFilteredData(newFilteredData);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <button onClick={scrollToFooter}> contact us</button>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {Object.entries(filteredData).map(([category, items]) =>
          items.map((item, idx) => (
            <div
              key={`${category}-${idx}`}
              className="w-80 p-3 bg-white rounded shadow-md hover:scale-105 transition-transform"
            >
              <button onClick={handleClick}>
                <span>
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={320}
                    height={200}
                  />
                  <p className="text-sm">{item.description}</p>
                  <p className="text-sm text-gray-600">Price: ${item.price}</p>
                  <p className="text-sm text-gray-600">
                    Location: {item.location}
                  </p>
                </span>
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-0 bg-black " ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
