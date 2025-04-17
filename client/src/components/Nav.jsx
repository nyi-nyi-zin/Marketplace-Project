import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";

const Nav = () => {
  const { user } = useSelector((state) => state.reducer.user);

  return (
    <nav className=" flex items-center justify-between text-blue-600 py-4 mb-4">
      <Link className="font-bold text-4xl " to={"/"}>
        NyiHub
      </Link>
      <div className=" flex items-center gap-3">
        <Link to={"/about"}>About</Link>
        <Link to={"/about"}>Contact</Link>
        <Link to={"/about"}>Q&A</Link>
      </div>
      {user ? (
        <div className="flex items-center gap-2">
          {user.role === "user" && (
            <Link to={"/profile"} className="  px-2 py-1 flex items-end gap-1">
              <UserIcon width={26} />
              Profile
            </Link>
          )}
          {user.role === "admin" && (
            <Link to={"/admin"} className="  px-2 py-1 flex items-end gap-1">
              <UserIcon width={26} />
              Admin Pannel
            </Link>
          )}
          <Link
            to={"/saved-products"}
            className="  px-2 py-1 flex items-end gap-1"
          >
            <BookmarkIcon width={26} />
          </Link>
        </div>
      ) : (
        <div className=" flex items-center gap-3 text-base font-medium">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
