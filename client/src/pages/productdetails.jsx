import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          process.env.BASE_URL + "/api/stock/products/search/slug",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ slug }),
          }
        );
        const data = await response.json();
        if (data.success === false) return (window.location.href = "/");
        if (response.ok) {
          setProduct(data.doc);
        } else {
          throw new Error("Error fetching product data");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (slug) {
      fetchProductData();
    }
  }, [slug]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formattedDate;
  };

  return (
    <div className="flex justify-center">
      <div className="min-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-64 h-64 object-cover mb-4 sm:mr-6 sm:mb-0"
        />
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2">Category: {product.category}</p>
          <p className="text-gray-600">Quantity: {product.quantity}</p>
          <p className="text-gray-600">
            Created At: {formatDate(product.createdAt)}
          </p>
          <p className="text-gray-600">
            Edited At: {formatDate(product.editedAt)}
          </p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          {/* Render other product details */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
