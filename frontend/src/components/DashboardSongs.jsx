import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { deleteSong, getAllSongs } from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { motion } from "framer-motion";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../config/firebase";

function DashboardSongs() {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setFocus] = useState(false);
  const [{ allSongs }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_Songs,
          allSongs: data,
        });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-20">
        <NavLink
          to={"/dashBoard/newSong"}
          className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:shadow-md cursor-pointer"
        >
          <IoAdd />
        </NavLink>

        <input
          type="text"
          className={`w-52 px-4 py-2 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base`}
          placeholder="Search here..."
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={() => {
            setFocus(false);
          }}
          onFocus={() => setFocus(true)}
        />

        <i>
          <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
        </i>
      </div>
      {/* main container */}
      <div className="relative w-full my-4 p-4 border border-gray-300 rounded-md">
        {/* bringing the count which we are making the absolute */}
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count:{" "}
            </span>
            {allSongs?.length}
          </p>
        </div>
        {/* song container space */}
        <SongContainer data={allSongs} />
      </div>
    </div>
  );
}
export const SongContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data && data.map((song, i) => <SongCard song={song} key={i} i={i} />)}
    </div>
  );
};
export const SongCard = ({ song, i }) => {
  const [{ AlertType, allSongs, songIndex, isSongPlaying }, dispatch] =
    useStateValue();
  const deleteS = () => {
    const deleteImageRef = ref(storage, song.imageURL);
    deleteObject(deleteImageRef).then(() => console.log("deleted image"));
    const deleteAudioRef = ref(storage, song.SongURL);
    deleteObject(deleteAudioRef).then(() => console.log("deleted Audio"));

    deleteSong(song._id).then((res) => {
      if (res.data) {
        dispatch({
          type: actionType.SET_ALERT,
          AlertType: "success",
        });
        setTimeout(() => {
          dispatch({
            type: actionType.SET_ALERT,
            AlertType: null,
          });
        }, 3000);
        getAllSongs().then((data) =>
          dispatch({ type: actionType.SET_ALL_Songs, allSongs: data })
        );
      }
    });
  };
  const addToContext = () => {
    console.log(i);
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONGPLAYING,
        isSongPlaying: true,
      });
    }
    if (songIndex !== i) {
      dispatch({
        type: actionType.SET_SONGINDEX,
        songIndex: i,
      });
    }
  };
  return (
    <motion.div
      className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card
   bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
      onClick={addToContext}
    >
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={song.imageURL}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <p className="text-base text-headingColor font-semibold my-2">
        {song.name.length > 25 ? `${song.name.slice(0, 25)}..` : song.name}
        <span className="block text-sm text-gray-500 my-1">
          {" "}
          {song.artist.length > 25
            ? `${song.artist.slice(0, 25)}...`
            : song.artist}
        </span>
      </p>

      <div className="w-full absolute bottom-2  flex items-center justify-between ox-4 ">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base text-red-400 drop-shadow-md hover:text-red-600"
        >
          <IoTrash
            onClick={() => {
              deleteS();
            }}
          />
        </motion.i>
      </div>
    </motion.div>
  );
};

export default DashboardSongs;
