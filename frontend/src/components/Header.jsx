import { Logo } from "../assets";
import { NavLink } from "react-router-dom";
import { isActiveStyles } from "../utils/styles";
import { isNotActiveStyles } from "../utils/styles";
export default function Header() {
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
        <li className="mx-5 text-lg">
          <NavLink
            to={"/songs"}
            className={({ isActive }) => {
              return isActive ? isActiveStyles : isNotActiveStyles;
            }}
          >
            songs
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
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
        </li>
      </ul>
      <div className=""></div>
    </header>
  );
}
