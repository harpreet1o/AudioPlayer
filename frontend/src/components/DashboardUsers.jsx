import React, { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import moment from "moment";
import { actionType } from "../context/reducer";
import { changingUserRole, getAllUsers } from "../api/index";
import { MdDelete } from "react-icons/md";
import { removeUser } from "../api/index";

function DashboardUsers() {
  const [{ allUsers, user }, dispatch] = useStateValue();

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex-col items-center justify-start p-4 border-gray-300 rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-sm font-semibold">
            Count :
            <span className="text-xl font-bold text-text-Color">
              {allUsers?.length}
            </span>
          </p>
        </div>

        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Image
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Name
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Email
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Verified
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Created
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Role
          </p>
        </div>
        {allUsers &&
          allUsers?.map((data, i) => (
            <DashBoardUserCard data={data} index={i} key={i} />
          ))}
      </div>
    </div>
  );
}
export const DashBoardUserCard = ({ data, index }) => {
  const updateUserRole = (userId, role) => {
    const sendRole = role == "Member" ? "Admin" : "Member";
    changingUserRole(userId, sendRole).then((res) => {
      console.log(res);
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data,
          });
        });
      }
    });
  };
  const deleteUser = (userId) => {
    const data = removeUser(userId);

    if (data) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data,
        });
      });
    }
  };
  const [{ allUsers, user }, dispatch] = useStateValue();
  const [isUpdated, setUpdate] = useState(false);

  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");
  return (
    <motion.div className="relative w-full rounded-md flex items-center justify-evenly py-4 bg-lightOverlay cursor-pointer hover:shadow-md">
      {/* {userimage} */}
      {data._id !== user.user._id ? (
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
          onClick={() => {
            deleteUser(data._id);
          }}
        >
          <MdDelete className="text-xl text-red-400 hover:text-red-500" />
        </motion.div>
      ) : (
        <></>
      )}
      <p>{index + 1}</p>
      <div className="w-275 min-2-[160px] flex items-center justify-center">
        <img
          src={data.imageURL}
          referrerPolicy="no-referrer"
          alt=""
          className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>
      {/* user name */}
      <p className="text-base text-textColor w-275 in-w-[160px] text-center">
        {data.name}
      </p>
      <p className="text-base text-textColor w-275 in-w-[160px] text-center">
        {data.email}
      </p>
      <p className="text-base text-textColor w-275 in-w-[160px] text-center">
        {data.email_verified ? "True" : "False"}
      </p>
      <p className="text-base text-textColor w-275 in-w-[160px] text-center">
        {createdAt}
      </p>
      <p className="text-base text-textColor w-275 in-w-[160px] text-center">
        {data.role}
      </p>{" "}
      <div className="w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor text-center">{data.role}</p>
      </div>
      {data._id !== user.user._id ? (
        <motion.p
          whileTap={{ scale: 0.75 }}
          onClick={() => setUpdate(true)}
          className="text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md"
        >
          {data.role === "admin" ? "Member" : "Admin"}
        </motion.p>
      ) : (
        <></>
      )}
      {isUpdated ? (
        <motion.div
          intial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute z-10 top-12 right-4 p-3 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md"
        >
          <p className="text-textColor text-sm font-semibold">
            Are you sure to convert the user to{" "}
            <span>{data.role === "admin" ? "Member" : "Admin"}</span>
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md"
              onClick={() => updateUserRole(data._id, data.role)}
            >
              Yes
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md"
              onClick={() => {
                setUpdate(false);
              }}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <></>
      )}
    </motion.div>
  );
};

export default DashboardUsers;
