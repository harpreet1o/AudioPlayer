import React from "react";
import Header from "./Header";
function Dashboard() {
  return (
    <div className="w-full h-auto flex flex-col justify-center bg-primary">
      <Header />
      <div className=" w-[60%] my-2 bg-blue-500 flex p-4 justify-evenly"></div>
    </div>
  );
}

export default Dashboard;
