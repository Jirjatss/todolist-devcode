import React from "react";
import Activity from "../components/Activity";
import Nav from "../components/Nav";

const Home = () => {
  return (
    <div className="App bg-white h-screen text-black font-signika">
      <Nav />
      <Activity />
    </div>
  );
};

export default Home;
