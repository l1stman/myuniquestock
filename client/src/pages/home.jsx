import { useState, useEffect } from "react";
import "../App.css";
import WhiteCard from "../components/category";
import Navbar from "../components/navbar";
import SearchBar from "../components/searchbar";
import TwoCards from "../components/twocards";

function Home() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetch(process.env.BASE_URL + "/api/users/admin/checktoken", {
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
        .catch();
    }
  }, []);

  return (
    <>
      <Navbar userdata={userData} />
      <SearchBar />
      <TwoCards />
      <WhiteCard />
    </>
  );
}

export default Home;
