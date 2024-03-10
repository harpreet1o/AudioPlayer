import React from "react";
import Header from "./Header";
import { IoHome } from "react-icons/io5";
import { NavLink, Route, Routes } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import {
  DashBoardHome,
  DashBoardAlbums,
  DashBoardSongs,
  DashBoardUsers,
  DashBoardArtists,
  DashBoardNewSong,
  Alert,
} from ".";
import { useStateValue } from "../context/StateProvider";

//this function is used if the user is admin else won't open
function Dashboard() {
  const [{ alertType }, dispatch] = useStateValue();
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className=" w-[60%] my-2 flex p-4 justify-evenly items-center">
        <NavLink to={"/dashBoard/home"}>
          <IoHome className="text-2xl text-textColor" />
        </NavLink>
        <NavLink
          to={"/dashBoard/users"}
          className={({ isActive }) => {
            isActive ? isActiveStyles : isNotActiveStyles;
          }}
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashBoard/songs"}
          className={({ isActive }) => {
            isActive ? isActiveStyles : isNotActiveStyles;
          }}
        >
          Songs
        </NavLink>
        <NavLink to={"/dashBoard/albums"}>Albums</NavLink>
        <NavLink to={"/dashBoard/artists"}>Artists</NavLink>
      </div>
      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashBoardHome />}></Route>
          <Route path="/songs" element={<DashBoardSongs />}></Route>
          <Route path="/albums" element={<DashBoardAlbums />}></Route>
          <Route path="/artists" element={<DashBoardArtists />}></Route>
          <Route path="/users" element={<DashBoardUsers />}></Route>
          <Route path="/newSong" element={<DashBoardNewSong />}></Route>
        </Routes>
      </div>
      {alertType && <Alert type={alertType} />}
    </div>
  );
}

export default Dashboard;
