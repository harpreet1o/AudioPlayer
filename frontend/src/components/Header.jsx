import { Logo } from "../assets";
import { NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles } from "../utils/styles";
import { isNotActiveStyles } from "../utils/styles";
import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../context/StateProvider";
import { app } from "../config/firebase";
import { getAuth } from "firebase/auth";
import { useState } from "react";

export default function Header() {
  const [{ user }, dispatch] = useStateValue();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/"}>
        <img src={Logo} alt="Logo" className="w-16" />
      </NavLink>
      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg">
          <NavLink
            to={"/home"}
            className={({ isActive }) => {
              return isActive ? isActiveStyles : isNotActiveStyles;
            }}
          >
            Home
          </NavLink>
        </li>
        {/* <li className="mx-5 text-lg">
          <NavLink
            to={"/songs"}
            className={({ isActive }) => {
              return isActive ? isActiveStyles : isNotActiveStyles;
            }}
          >
            songs
          </NavLink>
        </li> */}
        {/* <li className="mx-5 text-lg">
          <NavLink
            to={"/premium"}
            className={({ isActive }) => {
              return isActive ? isActiveStyles : isNotActiveStyles;
            }}
          >
            premium
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/contactUs"}
            className={({ isActive }) => {
              return isActive ? isActiveStyles : isNotActiveStyles;
            }}
          >
            Contact Us
          </NavLink>
        </li> */}
      </ul>
      <div
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
        onMouseEnter={() => setMenu(true)}
        onMouseLeave={() => setMenu(false)}
      >
        <img
          src={user?.user?.imageURL}
          alt=""
          className="w-12 min-w-[44px] h-12 object-cover rounded-full shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor fontn-semibold">
            {user?.user?.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Premium Member <FaCrown className="text-sm -ml-1 text-yellow-500" />
          </p>
        </div>
      </div>
      {menu ? (
        <div
          className="absolute z-10 top-12 p-3 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col transition-all duration-300"
          onMouseEnter={() => setMenu(true)}
          onMouseLeave={() => setMenu(false)}
        >
          <NavLink to={"/userProfile"}>
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              Profile
            </p>
          </NavLink>
          <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
            My favorite
          </p>
          <hr />
          {/* dashboard only availabe to the admin */}
          {user?.user?.role === "admin" && (
            <NavLink to={"/dashBoard"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Dashboard
              </p>
            </NavLink>
          )}
          <hr />
          <p
            className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
            onClick={() => logout()}
          >
            Signout
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </header>
  );
}
