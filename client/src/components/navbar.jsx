import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";

const Navbar = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      process.env.BASE_URL + "/api/users/admin/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.success === false) {
      setErrorMessage(data.message);
      return;
    }

    if (response.ok) {
      const token = data.token;
      setToken(token);

      // Save the token in local storage
      localStorage.setItem("token", token);
      // Save the token in local storage or state for future use
      // Reset the form and close the modal

      setUsername("");
      setPassword("");
      setShowModal(false);
      window.location.href = "/dashboard";
    }
  };

  const handleRemoveItem = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-black">
        <div className="flex items-center">
          <span className="text-white ml-2 text-lg" id="font-custom">
            MyUniqueStock
          </span>
        </div>
        {props.userdata ? (
          <button
            onClick={handleRemoveItem}
            id="font-custom"
            className="transition ease-in-out delay-150 hover:-translate-1 hover:scale-110 duration-300 bg-white hover:bg-gray-100 text-red-600 py-2 px-4 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            id="font-custom"
            className="transition ease-in-out delay-150 hover:-translate-1 hover:scale-110 duration-300 bg-white hover:bg-gray-100 text-black py-2 px-4 rounded"
          >
            Admin Panel
          </button>
        )}
      </nav>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold" id="font-custom">
                    Admin Sign-In
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <FaWindowClose />
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {errorMessage && (
                    <div className="mb-4 text-red-500" id="font-custom">
                      {errorMessage}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Username
                      </label>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        id="username"
                        className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        id="font-custom"
                        className="transition ease-in-out delay-150 hover:-translate-1 hover:scale-110 duration-300 bg-black hover:bg-gray-900 text-white py-2 px-4 rounded"
                        type="submit"
                      >
                        Submit
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
    </>
  );
};

export default Navbar;
