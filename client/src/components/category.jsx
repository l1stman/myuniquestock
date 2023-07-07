import React, { useEffect, useState } from "react";

const WhiteCard = () => {
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetch(process.env.BASE_URL + "/api/stock/products/getallcategories", {
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

  useEffect(() => {
    const fetchCategoryData = async () => {
      setCategoryData([]); // Clear previous data
      for (const category of categories) {
        try {
          const response = await fetch(
            process.env.BASE_URL +
              `/api/stock/products/filtred?type=category&value=${category}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
          const data = await response.json();
          setCategoryData((prevData) => [
            ...prevData,
            ...data.docs.slice(0, 4),
          ]);
        } catch (error) {
          console.error("Error fetching category data:", error);
        }
      }
    };

    fetchCategoryData();
  }, [categories]);

  return (
    <>
      {categories.map((category, index) => (
        <div
          key={index}
          className="max-w-3xl mx-auto bg-white rounded-lg w-full mt-12 mb-8 shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-4" id="font-custom">
            {category}
          </h2>

          <div className="flex justify-between">
            {categoryData
              .filter((item) => item.category === category)
              .map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-white rounded-lg shadow-md p-4 w-1/4"
                >
                  <a href={`/products/${item.slug}`}>
                    <img
                      src={item.image}
                      alt={`Image ${itemIndex + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <p className="text-center mt-2">{item.name}</p>
                  </a>
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default WhiteCard;
