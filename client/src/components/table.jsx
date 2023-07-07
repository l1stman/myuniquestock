import React from "react";

const ProductTable = ({
  productsList,
  handleEdit,
  handleInfo,
  handleDelete,
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Description
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Category
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Quantity
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {productsList.map((product) => (
          <tr key={product.id}>
            <td className="px-4 py-2 whitespace-nowrap">
              <div className="truncate">{product.name}</div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <div className="truncate">
                {product.description.length > 50
                  ? `${product.description.slice(0, 50)}...`
                  : product.description}
              </div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <div className="truncate">{product.category}</div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <div className="truncate">{product.quantity}</div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <button
                onClick={() => handleInfo(product)}
                id="font-custom"
                className="ml-2 py-2 px-4 rounded bg-yellow-600 hover:bg-yellow-900 text-white"
              >
                Info
              </button>
              <button
                onClick={() => handleEdit(product)}
                id="font-custom"
                className="ml-2 py-2 px-4 rounded bg-blue-600 hover:bg-blue-900 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product)}
                id="font-custom"
                className="ml-2 py-2 px-4 rounded bg-red-600 hover:bg-red-900 text-white"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
