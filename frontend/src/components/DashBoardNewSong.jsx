import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../config/firebase";
import { useStateValue } from "../context/StateProvider";

import { getAllAlbums, getAllArtists, getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { FilterButtons } from ".";
import { filterByLanguage, filters } from "../utils/supportfunction";
// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";
function DashBoardNewSong() {
  const [{ allArtists, allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_Artists,
          allArtists: data,
        });
      });
    }
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_Albums,
          allAlbums: data,
        });
      });
    }
  }, []);
  const [songName, setSongName] = useState("");
  return (
    <div className="flex  flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md">
      <input
        type="text"
        placeholder="Type your song name"
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm borddr border-gay-300 transparent"
        onChange={(e) => setSongName(e.target.value)}
        value={songName}
      />
      <div className="w-flex w-full justify-between flex flex-wrap items-center gap-4">
        <FilterButtons filterData={allArtists} flag={"Artist"} />
        <FilterButtons filterData={allAlbums} flag={"Albums"} />
        <FilterButtons filterData={filterByLanguage} flag={"Language"} />
        <FilterButtons filterData={filters} flag={"Category"} />
      </div>
    </div>
  );
}

export default DashBoardNewSong;
