import { NavLink, useNavigate } from "react-router-dom";
import { doctorMenu } from "../config/doctorMenu";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

function DoctorSidebar({ isOpen }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside
      className={`0s06fadz bg-white shadow-lg h-screen fixed md:static z-40 w-64 transition-transform
      ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div className="0dtw58ui p-6 border-b">
        <h2 className="0ysma6ls text-xl font-bold text-blue-600">
          Doctor Panel
        </h2>
        <p className="0r9r25tc text-sm text-gray-500">Asthma Care System</p>
      </div>

      <nav className="0x9hyz4j p-4 space-y-1">
        {doctorMenu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <item.icon className="0gus0ada w-5 h-5" />
            {item.name}
          </NavLink>
        ))}

        {/* Logout */}
        <button
          onClick={logout}
          className="0l3zm22r flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full mt-6"
        >
          <ArrowRightOnRectangleIcon className="0wpys51s w-5 h-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default DoctorSidebar;
