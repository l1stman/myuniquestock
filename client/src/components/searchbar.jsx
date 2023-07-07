import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        process.env.BASE_URL + "/api/stock/products/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm }),
        }
      );
      const data = await response.json();
      if (data.success === false) {
        setErrorMessage("Error searching products");
        setSearchResults([]);
        return;
      }

      if (data.success === true) {
        if (Array.isArray(data.docs)) {
          setSearchResults(data.docs);
          setErrorMessage("");
        } else {
          setSearchResults([]);
          setErrorMessage("");
        }
      } else {
        throw new Error("Error searching products");
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <nav className="flex items-center justify-center p-4 bg-white">
      <div className="flex items-center justify-center w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            id="font-custom"
            className=" bg-white text-black outline-none placeholder-gray-400 rounded-lg py-2 px-4 pr-64 border-black border-2 w-full sm:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="absolute right-0 top-0 h-full flex items-center justify-center bg-black text-white rounded-r-lg px-3"
            onClick={handleSearch}
          >
            <FaSearch size={20} />
          </button>
        </div>
      </div>
      {errorMessage && (
        <p className="text-red-500" id="font-custom">
          {errorMessage}
        </p>
      )}
      {searchResults.map((product, index) => (
        <div key={product.id} className="mr-4">
          <a
            href={`/products/${product.slug}`}
            className="text-blue-500 hover:underline"
            id="font-custom"
          >
            {index + 1}.{product.name}
          </a>
        </div>
      ))}
    </nav>
  );
};

export default SearchBar;
