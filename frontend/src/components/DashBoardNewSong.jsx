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

import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  saveNewSong,
  saveNewArtist,
  saveNewAlbum,
} from "../api";
import { actionType } from "../context/reducer";
import { FilterButtons } from ".";
import { filterByLanguage, filters } from "../utils/supportfunction";
// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";
function DashBoardNewSong() {
  const [
    {
      allSongs,
      allArtists,
      allAlbums,
      artistFilter,
      albumFilter,
      filterTerm,
      languageFilter,
      alertType,
    },
    dispatch,
  ] = useStateValue();
  const [songName, setSongName] = useState("");
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [isImageLoading, setImageLoading] = useState(false);

  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [artistUploading, setIsArtistUploading] = useState(false);
  const [artistUploadingProgress, setArtistUploadingProgress] = useState(0);
  const [artistName, setArtistName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [albumUploading, setIsAlbumUploading] = useState(false);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [albumName, setAlbumName] = useState("");

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

  const deleteFileObject = (url, isImage) => {
    console.log("hi");
    if (isImage) {
      setImageLoading(true);
      setIsAudioLoading(true);
      setIsAlbumUploading(true);
      setIsArtistUploading(true);
      dispatch({
        type: actionType.SET_ALERT,
        alertType: "success",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT,
          alertType: null,
        });
      }, 4000);
    }

    const deleteRef = ref(storage, url);

    deleteObject(deleteRef).then(() => {
      dispatch({
        type: actionType.SET_ALERT,
        alertType: "danger",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT,
          alertType: null,
        });
      }, 4000);
      isImage ? setSongImageCover(null) : setAudioImageCover(null);
      setAlbumImageCover(null);
      setArtistImageCover(null);
      setIsAlbumUploading(false);
      setIsArtistUploading(false);
      setImageLoading(false);
      setIsAudioLoading(false);
    });
  };
  const saveSong = () => {
    if (!songImageCover || !audioImageCover) {
      dispatch({
        type: actionType.SET_ALERT,
        alertType: "danger",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT,
          alertType: null,
        });
      }, 4000);
    } else {
      setIsAudioLoading(true);
      setImageLoading(true);
      const data = {
        name: songName,
        artist: artistFilter,
        imageURL: songImageCover,
        SongURL: audioImageCover,
        album: albumFilter,
        language: languageFilter,
        category: filterTerm,
      };
      console.log(data);
      saveNewSong(data).then((res) => {
        getAllSongs().then((songs) => {
          dispatch({
            type: actionType.SET_ALL_Songs,
            allSongs: songs,
          });
        });
      });
      dispatch({
        type: actionType.SET_ALERT,
        alertType: "success",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT,
          alertType: null,
        });
      }, 4000);
      setSongName(null);
      setIsAudioLoading(false);
      setImageLoading(false);

      setSongImageCover(null);
      setAudioImageCover(null);
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: "all" });
    }
  };
  const saveArtist = () => {
    if (!artistImageCover || !artistName || !twitter || !instagram) {
      dispatch({
        type: actionType.SET_ALERT,
        alertType: "danger",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT,
          alertType: null,
        });
      }, 4000);
    } else {
      setIsArtistUploading(true);
      const data = {
        name: artistName,
        imageURL: artistImageCover,
        twitter: `www.twitter.com/${twitter}`,
        instagram: `www.intagram.com/${instagram}`,
      };
      saveNewArtist(data).then((res) => {
        getAllArtists().then((artists) => {
          dispatch({
            type: actionType.SET_ALL_Artists,
            allArtists: artists.artist,
          });
        });
      });

      dispatch({
        type: actionType.SET_ALERT,
        alertType: "success",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT,
          alertType: null,
        });
      }, 4000);
      setIsArtistUploading(false);
      setArtistImageCover(null);
      setTwitter("");
      setInstagram("");
    }
  };
  const saveAlbum = () => {
    if (!albumImageCover || !albumName) {
      dispatch({
        type: actionType.SET_ALERT,
        alertType: "danger",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT,
          alertType: null,
        });
      }, 4000);
    } else {
      const data = {
        name: albumName,
        imageURL: albumImageCover,
      };
      saveNewAlbum(data).then((res) => {
        getAllAlbums().then((album) => {
          dispatch({
            type: actionType.SET_ALL_Albums,
            allAlbums: album.album,
          });
        });
      });
      dispatch({
        type: actionType.SET_ALERT,
        alertType: "success",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT,
          alertType: null,
        });
      }, 4000);
      setIsAlbumUploading(false);
      setAlbumImageCover(null);
      setAlbumName("");
    }
  };

  return (
    <div className="flex  flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md w-800">
      <div>
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
        <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300  cursor-pointer">
          {isImageLoading && <ImageLoader progress={imageUploadProgress} />}
          {!isImageLoading && (
            <>
              {!songImageCover ? (
                <FileUploader
                  updateState={setSongImageCover}
                  setProgress={setImageUploadProgress}
                  isLoading={setImageLoading}
                  isImage={true}
                />
              ) : (
                <div className="relative w-full h-full overflow-hidden rounded-md">
                  <img
                    src={songImageCover}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                    onClick={() => {
                      deleteFileObject(songImageCover, true);
                    }}
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        {/* for audio upload */}
        <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300  cursor-pointer">
          {isAudioLoading && <ImageLoader progress={audioUploadProgress} />}
          {!isAudioLoading && (
            <>
              {!audioImageCover ? (
                <FileUploader
                  updateState={setAudioImageCover}
                  setProgress={setAudioUploadProgress}
                  isLoading={setIsAudioLoading}
                  isImage={false}
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                  <audio src={audioImageCover} controls />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                    onClick={() => {
                      deleteFileObject(audioImageCover, false);
                    }}
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex items-center justify-center w-60 cursor-pointer p-4">
          {isImageLoading || isAudioLoading ? (
            <Button />
          ) : (
            <motion.button
              onClick={saveSong}
              whileTap={{ scale: 0.75 }}
              className="py-2 rounded-md px-8 text-white bg-red-600 hover:shadow-lg"
            >
              Save song
            </motion.button>
          )}
        </div>
        {/* Image uploader for artist */}
        <h1 className="text-xl font-semibold text-headingColor">
          Artist's Details
        </h1>

        <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300  cursor-pointer">
          {artistUploading && (
            <ImageLoader progress={artistUploadingProgress} />
          )}
          {!artistUploading && (
            <>
              {!artistImageCover ? (
                <FileUploader
                  updateState={setArtistImageCover}
                  setProgress={setArtistUploadingProgress}
                  isLoading={setIsArtistUploading}
                  isImage={true}
                />
              ) : (
                <div className="relative w-full h-full overflow-hidden rounded-md">
                  <img
                    src={artistImageCover}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                    onClick={() => {
                      deleteFileObject(artistImageCover, true);
                    }}
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* /artist name */}
        <input
          type="text"
          placeholder="Artist name.."
          className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm borddr border-gay-300 transparent"
          onChange={(e) => setArtistName(e.target.value)}
          value={artistName}
        />
        {/* twitter45`19 */}
        <input
          type="text"
          placeholder="Twitter"
          className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm borddr border-gay-300 transparent"
          onChange={(e) => setTwitter(e.target.value)}
          value={twitter}
        />
        <input
          type="text"
          placeholder="Instagram"
          className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm borddr border-gay-300 transparent"
          onChange={(e) => setInstagram(e.target.value)}
          value={instagram}
        />
        <div className="flex items-center justify-center w-60 cursor-pointer p-4">
          {artistUploading ? (
            <Button />
          ) : (
            <motion.button
              onClick={saveArtist}
              whileTap={{ scale: 0.75 }}
              className="py-2 rounded-md px-8 text-white bg-red-600 hover:shadow-lg"
            >
              <p>Save Artist</p>
            </motion.button>
          )}
        </div>
        {/* Image uploader for album */}
        <h1 className="text-xl font-semibold text-headingColor">
          Album's Details
        </h1>
        <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300  cursor-pointer">
          {albumUploading && <ImageLoader progress={albumUploadingProgress} />}
          {!albumUploading && (
            <>
              {!albumImageCover ? (
                <FileUploader
                  updateState={setAlbumImageCover}
                  setProgress={setAlbumUploadingProgress}
                  isLoading={setIsAlbumUploading}
                  isImage={true}
                />
              ) : (
                <div className="relative w-full h-full overflow-hidden rounded-md">
                  <img
                    src={albumImageCover}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                    onClick={() => {
                      deleteFileObject(albumImageCover, true);
                    }}
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* /artist name */}
        <input
          type="text"
          placeholder="Album name.."
          className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm borddr border-gay-300 transparent"
          onChange={(e) => setAlbumName(e.target.value)}
          value={albumName}
        />

        <div className="flex items-center justify-center w-60 cursor-pointer p-4">
          {albumUploading ? (
            <Button />
          ) : (
            <motion.button
              onClick={saveAlbum}
              whileTap={{ scale: 0.75 }}
              className="py-2 rounded-md px-8 text-white bg-red-600 hover:shadow-lg"
            >
              <p>Save Album</p>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
export const Button = () => {
  return (
    <>
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};
export const ImageLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600  animate-ping  rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl "></div>
      </div>
    </div>
  );
};
export const FileUploader = function ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) {
  const [
    {
      allSongs,
      allArtists,
      allAlbums,
      artistFilter,
      albumFilter,
      filterTerm,
      languageFilter,
      alertType,
    },
    dispatch,
  ] = useStateValue();
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `${isImage ? "Images" : "Audio"}/${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
        dispatch({
          type: actionType.SET_ALERT,
          alertType: "danger",
        });
        setTimeout(() => {
          dispatch({
            type: actionType.SET_ALERT,
            alertType: null,
          });
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });
        dispatch({
          type: actionType.SET_ALERT,
          alertType: "success",
        });
        setTimeout(() => {
          dispatch({
            type: actionType.SET_ALERT,
            alertType: null,
          });
        }, 4000);
      }
    );
  };
  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            Click to upload an {isImage ? "image" : "audio"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className="w-0 h-0"
        onChange={uploadFile}
      />
    </label>
  );
};
export default DashBoardNewSong;
