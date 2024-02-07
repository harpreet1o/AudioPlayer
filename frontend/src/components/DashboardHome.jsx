import React, { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAllUsers, getAllAlbums, getAllArtists, getAllSongs } from "../api";
import { actionType } from "../context/reducer";
// importing the icons
import { FaUsers, FaMusic } from "react-icons/fa";
import { LiaHatCowboySolid } from "react-icons/lia";
import { MdAlbum } from "react-icons/md";
import { bgColors } from "../utils/styles";

export const DashBoardCard = ({ icon, name, count }) => {
  const randomC = bgColors[Math.floor(Math.random() * bgColors.length)];
  return (
    <div
      style={{ background: `${randomC}` }}
      className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-randomC"
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-xl text-textColor ">{count}</p>
    </div>
  );
};
function DashboardHome() {
  const [{ allUsers, allSongs, allAlbums, allArtists }, dispatch] =
    useStateValue();
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) =>
        dispatch({ type: actionType.SET_ALL_USERS, allUsers: data })
      );
    }
    if (!allSongs) {
      getAllSongs().then((data) =>
        dispatch({ type: actionType.SET_ALL_Songs, allSongs: data })
      );
    }
    if (!allAlbums) {
      getAllAlbums().then((data) =>
        dispatch({ type: actionType.SET_ALL_Albums, allAlbums: data })
      );
    }
    if (!allArtists) {
      getAllArtists().then((data) =>
        dispatch({ type: actionType.SET_ALL_Artists, allArtists: data })
      );
    }
  }, []);
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashBoardCard
        icon={<FaUsers className="text-3xl text-textColor" />}
        name={"Users"}
        count={allUsers?.length > 0 ? allUsers?.length : 0}
      />
      <DashBoardCard
        icon={<FaMusic className="text-3xl text-textColor" />}
        name={"Songs"}
        count={allSongs?.length > 0 ? allSongs?.length : 0}
      />
      <DashBoardCard
        icon={<LiaHatCowboySolid className="text-3xl text-textColor" />}
        name={"Artists"}
        count={allArtists?.length > 0 ? allArtists?.length : 0}
      />
      <DashBoardCard
        icon={<MdAlbum className="text-3xl text-textColor" />}
        name={"Albums"}
        count={allAlbums?.length > 0 ? allAlbums?.length : 0}
      />
    </div>
  );
}

export default DashboardHome;
