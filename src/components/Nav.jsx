import React from "react";

const Nav = () => {
  return (
    <div className="bg-sky-500  lg:px-20 sm:px-4 py-8 text-white" data-cy="activity-item-navbar">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <h1 className="font-bold text-4xl flex" data-cy="header-title">
          TO DO LIST APP
        </h1>
      </div>
    </div>
  );
};

export default Nav;
