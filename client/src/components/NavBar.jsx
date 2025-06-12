import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className=" h-20 w-full bg-slate-800  flex justify-between  items-center px-4 font-bold text-amber-50 text-2xl">
      <p onClick={() => navigate("/")} className="hover:cursor-pointer">
        LOGO
      </p>
      <ul className="flex space-x-8">
        <li onClick={() => navigate("/")} className="hover:cursor-pointer">
          Daily Task
        </li>
        <li onClick={() => navigate("/about")} className="hover:cursor-pointer">
          About
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
