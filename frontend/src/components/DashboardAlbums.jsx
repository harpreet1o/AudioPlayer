import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";

import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { actionType } from "../context/reducer";
import { deleteAlbum, deleteArtist, getAllAlbums } from "../api";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../config/firebase";

const DashboardAlbums = () => {
  const [{ allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_Albums,
          allAlbums: data,
        });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
        {allAlbums &&
          allAlbums.map((data, index) => (
            <AlbumCard key={index} data={data} index={index} />
          ))}
      </div>
    </div>
  );
};

export const AlbumCard = ({ data, index }) => {
  const [{ AlertType, allAlbums }, dispatch] = useStateValue();
  const [isDelete, setIsDelete] = useState(false);
  const deleteS = () => {
    console.log(data);
    const deleteImageRef = ref(storage, data.imageURL);
    deleteObject(deleteImageRef).then(() => console.log("deleted image"));
    deleteAlbum(data._id).then((res) => {
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
        getAllAlbums().then((data) =>
          dispatch({ type: actionType.SET_ALL_Albums, allAlbums: data })
        );
      }
      setIsDelete(false);
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative  overflow-hidden w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
    >
      <img
        src={data?.imageURL}
        className="w-full h-40 object-cover rounded-md"
        alt=""
      />

      <p className="text-base text-textColor">{data.name}</p>

      <motion.i
        className="absolute bottom-2 right-2"
        whileTap={{ scale: 0.75 }}
        onClick={() => setIsDelete(true)}
      >
        <MdDelete className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
      </motion.i>

      {isDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
        >
          <p className="text-gray-100 text-base text-center">
            Are you sure do you want to delete this?
          </p>
          <div className="flex items-center w-full justify-center gap-3">
            <div className="bg-red-300 px-3 rounded-md">
              <button
                onClick={() => {
                  deleteS();
                }}
                className="text-headingColor text-sm"
              >
                Yes
              </button>
            </div>
            <div
              className="bg-green-300 px-3 rounded-md"
              onClick={() => setIsDelete(false)}
            >
              <p className="text-headingColor text-sm">No</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardAlbums;
