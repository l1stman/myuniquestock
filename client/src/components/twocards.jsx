import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

const TwoCards = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/api/stock/products/getallcategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories.slice(0, 10));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center mt-8 md:mt-8">
      <div className="mt-4 bg-white p-4 md:p-6 h-auto md:h-80 rounded-lg w-full md:w-1/4 mr-0 md:mr-4 ml-0 md:ml-8">
        {/* Content for the smaller card */}
        <div className="flex items-center">
          <FaBars className="mr-4" />
          <h2 className="text-xl font-bold mb-1" id="font-custom">
            Categories
          </h2>
        </div>
        <ul className="mt-4">
          {categories.map((category, index) => (
            <li key={category} id="font-custom">
              {index + 1}. {category}
            </li>
          ))}
        </ul>
      </div>
      <div className=" p-6 h-auto md:h-80 rounded-lg mt-4 w-full md:w-2/3 mr-0 md:mr-8 ml-0 md:ml-4">
        <h1 id="font-custom" className="text-[50px] text-bold">
          MyUnique
          <span className="underline decoration-blue-500 decoration-4">
            Stock
          </span>{" "}
          App
        </h1>
        <p id="font-custom" className="mt-4 mb-4 text-xl">
          Users can create and maintain a digital catalog of products, including
          essential information such as product names, descriptions, SKUs, and
          images. This allows for easy identification and organization of
          products.
        </p>
      </div>
    </div>
  );
};

export default TwoCards;
