import React from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-";

function DashboardSongs() {
  return (
    <div className="w-full p-4 flex items-center justify-center lex-col">
      <div className="w-full flex justify-center items-center gap-20">
        <NavLink to={"/dashBoard/newSongs"}></NavLink>
      </div>
    </div>
  );
}

export default DashboardSongs;
