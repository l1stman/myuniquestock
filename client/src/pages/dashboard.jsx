import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import ProductTable from "../components/table";
import { FaWindowClose } from "react-icons/fa";
const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [productsList, setProductsList] = useState([]);
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [productinfo, setproductinfo] = useState([]);

  const [newproductinfo, setnewproductinfo] = useState("");

  const [editedproductinfo, seteditedproductinfo] = useState();
  const [neweditedproductinfo, setneweditedproductinfo] = useState();

  const [errorMessage, setErrorMessage] = useState("");
  const [notification, setNotification] = useState("");
  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };
  // User
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetch("http://localhost:3333/api/users/admin/checktoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ token: storedToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data); // Store user data in state
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      window.location.href = "/";
    }
  }, []);
  // Products
  useEffect(() => {
    fetch("http://localhost:3333/api/stock/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProductsList(data.docs); // Store products list in state
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    if (!showEditModal && !showCreateModal) {
      // Modal was closed
      setErrorMessage("");
    }
  }, [showEditModal, showCreateModal]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    });
    return formattedDate;
  };

  const formatDate2 = (dateString) => {
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

  const handleEdit = (product) => {
    setShowEditModal(true);
    seteditedproductinfo(product);
  };

  const handleInfo = (product) => {
    setShowInfoModal(true);
    setproductinfo(product);
  };

  const handleDelete = (product) => {
    setShowDeleteModal(true);
    setproductinfo(product);
  };

  const createProduct = async (e) => {
    e.preventDefault();
    if (!newproductinfo) {
      return setErrorMessage("Please type new product data");
    }
    const response = await fetch(
      "http://localhost:3333/api/stock/products/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newproductinfo),
      }
    );

    const data = await response.json();

    if (data.success === false) {
      return setErrorMessage(data.message);
    }
    if (data.success === true) {
      const updatedList = productsList.concat(data.doc);
      setProductsList(updatedList);
      console.log(updatedList);
      setnewproductinfo("");
      setShowCreateModal(false);
      setErrorMessage("");
      setNotification(data.message);
      setTimeout(() => {
        setNotification("");
      }, 2500);
    }

    // sifet l backend w hta yjawb 3ad ndir product y tajouta b data jdida wla y7ot error
  };

  const editProduct = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:3333/api/stock/products/edit",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedproductinfo),
      }
    );

    const data = await response.json();

    if (data.success === false) {
      return setErrorMessage(data.message);
    }
    if (data.success === true) {
      const updatedList1 = productsList.filter((p) => p.id !== data.doc.id);
      const updatedList2 = updatedList1.concat(data.doc);
      setProductsList(updatedList2);
      seteditedproductinfo("");
      setShowEditModal(false);
      setErrorMessage("");
      setNotification(data.message);
      setTimeout(() => {
        setNotification("");
      }, 2500);
    }
  };

  const DeleteProduct = async (e) => {
    e.preventDefault();
    console.log(productinfo);
    const response = await fetch(
      "http://localhost:3333/api/stock/products/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productinfo),
      }
    );

    const data = await response.json();

    if (data.success === false) {
      return setErrorMessage(data.message);
    }

    if (data.success === true) {
      const updatedList = productsList.filter((p) => p.id !== productinfo.id);
      setProductsList(updatedList);
      setShowDeleteModal(false);
      setErrorMessage("");
      setNotification(data.message);
      setTimeout(() => {
        setNotification("");
      }, 2500);
    }
  };

  return (
    <>
      {notification && (
        <div
          id="font-custom"
          className="absolute top-0 left-0 mt-2 ml-2 p-2 bg-white text-green-500 rounded"
        >
          <p>{notification}</p>
        </div>
      )}
      <Navbar userdata={userData} />

      {userData && (
        <>
          <div className="flex items-center justify-center mt-4 mb-4">
            <div className="bg-white rounded shadow p-6 w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-5/12 relative">
              <button
                onClick={() => setShowCreateModal(true)}
                type="button"
                id="font-custom"
                className="mt-4 mr-4 absolute top-0 right-0 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Create a New Product
              </button>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <p className="text-lg">{userData.user.username}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <p className="text-lg">{userData.user.full_name}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <p className="text-lg">{userData.user.password}</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <ProductTable
              productsList={productsList}
              handleEdit={handleEdit}
              handleInfo={handleInfo}
              handleDelete={handleDelete}
            />
          </div>
        </>
      )}
      {showCreateModal ? (
        <>
          <div className="justify-center items-center w-full flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {errorMessage && (
                    <div className="mb-3 text-red-500" id="font-custom">
                      {errorMessage}
                    </div>
                  )}
                  <button
                    className="p-1 ml-auto border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowCreateModal(false)}
                  >
                    <FaWindowClose />
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto" id="font-custom">
                  <h3
                    id="font-custom"
                    className="text-center mb-2 text-lg font-normal text-green-500 dark:text-green-400"
                  >
                    Create Product
                  </h3>
                  <form onSubmit={createProduct} className="p-6 text-center">
                    <div className="flex mb-4">
                      <div className="w-1/2 mr-2">
                        <label
                          htmlFor="name"
                          className="block text-gray-700 dark:text-gray-400"
                        >
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Name"
                          className="mt-1 block w-full border-b-2 border-gray-800 shadow-sm outline-none"
                          value={newproductinfo.name}
                          onChange={(e) =>
                            setnewproductinfo((prevProduct) => ({
                              ...prevProduct,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="w-1/2 ml-2">
                        <label
                          htmlFor="description"
                          className="block text-gray-700 dark:text-gray-400"
                        >
                          Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows="5"
                          placeholder="Description"
                          className="mt-1 block w-full rounded-lg border-2 border-gray-800 shadow-sm outline-none"
                          value={newproductinfo.description}
                          onChange={(e) =>
                            setnewproductinfo((prevProduct) => ({
                              ...prevProduct,
                              description: e.target.value,
                            }))
                          }
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      <div className="w-1/2 mr-2">
                        <label
                          htmlFor="category"
                          className="block text-gray-700 dark:text-gray-400"
                        >
                          Category
                        </label>
                        <input
                          type="text"
                          id="category"
                          name="category"
                          placeholder="Category"
                          className="mt-1 block w-full  border-b-2 border-gray-800 shadow-sm outline-none"
                          value={newproductinfo.category}
                          onChange={(e) =>
                            setnewproductinfo((prevProduct) => ({
                              ...prevProduct,
                              category: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="w-1/2 ml-2">
                        <label
                          htmlFor="quantity"
                          className="block text-gray-700 dark:text-gray-400"
                        >
                          Quantity
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          placeholder="Quantity"
                          defaultValue={0}
                          className="mt-1 block w-full  border-b-2 border-gray-800 shadow-sm outline-none"
                          value={newproductinfo.quantity}
                          onChange={(e) =>
                            setnewproductinfo((prevProduct) => ({
                              ...prevProduct,
                              quantity: parseInt(e.target.value),
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="image"
                        className="block text-gray-700 dark:text-gray-400"
                      >
                        Image Link <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        placeholder="image link"
                        className="mt-1 block w-full  border-b-2 border-gray-800 shadow-sm outline-none"
                        value={newproductinfo.image}
                        onChange={(e) =>
                          setnewproductinfo((prevProduct) => ({
                            ...prevProduct,
                            image: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        onClick={() => setShowCreateModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showInfoModal ? (
        <>
          {productinfo && (
            <>
              {showPopup && (
                <div
                  id="font-custom"
                  className="absolute top-0 left-0 mt-2 ml-2 p-2 bg-white text-black rounded"
                >
                  <p>Created At: {formatDate2(productinfo.createdAt)}</p>
                  <p>Edited At: {formatDate2(productinfo.editedAt)}</p>
                </div>
              )}
              <div className="justify-center items-center w-full flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-6xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-xl font-semibold" id="font-custom">
                        {productinfo.name} ({productinfo.id})
                      </h3>
                      <button
                        className="p-1 ml-auto border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowInfoModal(false)}
                      >
                        <FaWindowClose />
                      </button>
                    </div>

                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th>Full Description</th>
                            <th>Category</th>
                            <th>Slug</th>
                            <th>Quantity</th>
                            <th>Image</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-center">
                            <td>{productinfo.description}</td>
                            <td>{productinfo.category}</td>
                            <td>{productinfo.slug}</td>
                            <td>{productinfo.quantity}</td>
                            <td>
                              <img
                                className="w-full h-32"
                                src={productinfo.image}
                                alt="Product Image"
                              />
                            </td>
                            <td
                              onMouseEnter={handleTogglePopup}
                              onMouseLeave={handleTogglePopup}
                            >
                              {formatDate(productinfo.createdAt)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showEditModal ? (
        <>
          <div className="justify-center items-center w-full flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {errorMessage && (
                    <div className="mb-3 text-red-500" id="font-custom">
                      {errorMessage}
                    </div>
                  )}
                  <button
                    className="p-1 ml-auto border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowEditModal(false)}
                  >
                    <FaWindowClose />
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto" id="font-custom">
                  <h3
                    id="font-custom"
                    className="text-center mb-2 text-lg font-normal text-blue-500 dark:text-blue-400"
                  >
                    Edit Product
                  </h3>
                  <form onSubmit={editProduct} className="p-6 text-center">
                    <div className="flex mb-4">
                      <div className="w-1/2 mr-2">
                        <label
                          htmlFor="name"
                          className="block text-gray-700 dark:text-gray-400"
                        >
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Name"
                          className="mt-1 block w-full border-b-2 border-gray-800 shadow-sm outline-none"
                          value={editedproductinfo.name}
                          onChange={(e) =>
                            seteditedproductinfo((prevProduct) => ({
                              ...prevProduct,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="w-1/2 mr-2">
                        <label
                          htmlFor="slug"
                          className="block text-gray-700 dark:text-gray-400"
                        >
                          Slug <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="slug"
                          name="slug"
                          placeholder="Slug"
                          className="mt-1 block w-full border-b-2 border-gray-800 shadow-sm outline-none"
                          value={editedproductinfo.slug}
                          onChange={(e) =>
                            seteditedproductinfo((prevProduct) => ({
                              ...prevProduct,
                              slug: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full ml-2">
                      <label
                        htmlFor="description"
                        className="block text-gray-700 dark:text-gray-400"
                      >
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="5"
                        placeholder="Description"
                        className="mt-1 block w-full rounded-lg border-2 border-gray-800 shadow-sm outline-none"
                        value={editedproductinfo.description}
                        onChange={(e) =>
                          seteditedproductinfo((prevProduct) => ({
                            ...prevProduct,
                            description: e.target.value,
                          }))
                        }
                      ></textarea>
                    </div>
                    <div className="flex mb-4">
                      <div className="w-1/2 mr-2">
                        <label
                          htmlFor="category"
                          className="block text-gray-700 dark:text-gray-400"
                        >
                          Category
                        </label>
                        <input
                          type="text"
                          id="category"
                          name="category"
                          placeholder="Category"
                          className="mt-1 block w-full  border-b-2 border-gray-800 shadow-sm outline-none"
                          value={editedproductinfo.category}
                          onChange={(e) =>
                            seteditedproductinfo((prevProduct) => ({
                              ...prevProduct,
                              category: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="w-1/2 ml-2">
                        <label
                          htmlFor="quantity"
                          className="block text-gray-700 dark:text-gray-400"
                        >
                          Quantity
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          placeholder="Quantity"
                          className="mt-1 block w-full  border-b-2 border-gray-800 shadow-sm outline-none"
                          value={editedproductinfo.quantity}
                          onChange={(e) =>
                            seteditedproductinfo((prevProduct) => ({
                              ...prevProduct,
                              quantity: parseInt(e.target.value),
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="image"
                        className="block text-gray-700 dark:text-gray-400"
                      >
                        Image Link <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        placeholder="image link"
                        className="mt-1 block w-full  border-b-2 border-gray-800 shadow-sm outline-none"
                        value={editedproductinfo.image}
                        onChange={(e) =>
                          seteditedproductinfo((prevProduct) => ({
                            ...prevProduct,
                            image: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        onClick={() => setShowEditModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showDeleteModal ? (
        <>
          {productinfo && (
            <>
              <div className="justify-center items-center w-full flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-6xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-xl font-semibold" id="font-custom">
                        {productinfo.name} ({productinfo.id})
                      </h3>
                      <button
                        className="p-1 ml-auto border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowDeleteModal(false)}
                      >
                        <FaWindowClose />
                      </button>
                    </div>

                    {/*body*/}
                    <div className="relative p-6 flex-auto" id="font-custom">
                      {errorMessage && (
                        <div className="mb-3 text-red-500" id="font-custom">
                          {errorMessage}
                        </div>
                      )}
                      <div className="p-6 text-center">
                        <svg
                          className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Are you sure you want to delete this product?
                        </h3>
                        <button
                          onClick={DeleteProduct}
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        >
                          Yes, I'm sure
                        </button>
                        <button
                          type="button"
                          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                          onClick={() => setShowDeleteModal(false)}
                        >
                          No, cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default Dashboard;
