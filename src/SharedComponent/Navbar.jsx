import { Link, NavLink } from "react-router-dom";
import { RiMenuAddLine } from "react-icons/ri";
import { CgMenuMotion } from "react-icons/cg";
import { useState } from "react";
import useUser from "../CustomHocks/useUser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { user, logOutUser } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPageLoad, setisPageLoad] = useState(false);

  const handelLogOut = () => {
    logOutUser()
      .then(() => {
        toast('Logout Success ')
      })
  }

  const menu = [
    {
      name: "Home",
      path: "/",
      type: "public",
    },
    {
      name: "Paintings",
      path: "/paintings",
      type: "public",
    },
    {
      name: "Generate-Paint",
      path: "/generatePaint",
      type: "public",
    },
  ];
  return (
    <nav className="overflow-x-clip">
      <ToastContainer />
      {user && (
        <div className="bg-black ">
          <p className="text-center max-w-7xl m-auto text-white bg-black py-2 bg-opacity-90">
            Welcome Mr. {user?.displayName} ❤️. Here you can create AI images
          </p>
        </div>
      )}
      <div className="text-center bg-slate-400"></div>
      <div className="w-11/12 mx-auto py-5 flex justify-between items-center relative">
        <Link to="/" className="logo">
          <span className="text-xl font-bold text-stone-700">
            Calvin🎨<span className=" text-[#f700bb]">AI</span>
          </span>
        </Link>

        {/* menu-lg start */}
        <ul className="hidden lg:flex items-center gap-5 ">
          {menu.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.name}
            </NavLink>
          ))}
          {user && user?.email ? (
            <>
              <NavLink key="/replies" to="/replies">
                My Replies
              </NavLink>
              <button onClick={ handelLogOut} className="cursor-pointer hover:underline" >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </ul>

        <div className="lg:hidden ">
          {!isMenuOpen ? (
            <RiMenuAddLine
              onClick={() => {
                setIsMenuOpen(true);
                setisPageLoad(true);
              }}
              className="text-2xl cursor-pointer"
            ></RiMenuAddLine>
          ) : (
            <CgMenuMotion
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl cursor-pointer"
            ></CgMenuMotion>
          )}

          {
            <ul
              className={`flex animate__animated bg-white flex-col lg:hidden gap-5 absolute z-50 bg-opacity-70 w-full top-14  left-0 ${isMenuOpen
                  ? "animate__fadeInRight "
                  : isPageLoad
                    ? "animate__fadeOutRight flex "
                    : "hidden"
                } `}
            >
              {menu.map((item) => (
                <NavLink
                  className="border-b-2 hover:border-orange-500 transition duration-200
                   "
                  key={item.path}
                  to={item.path}
                >
                  {item.name}
                </NavLink>
              ))}
              {user && user?.email ? (
                <>
                  <NavLink key="/replies" to="/replies">
                    My Replies
                  </NavLink>
                  <button onClick={handelLogOut} className="cursor-pointer hover:underline" >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/registration">Register</NavLink>
                </>
              )}
            </ul>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;