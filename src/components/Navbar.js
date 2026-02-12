import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm">
      <div className="text-xl font-bold text-blue-600">
        Smart Asthma <span className="text-gray-500">Management</span>
      </div>

      <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
        <li className="text-blue-600 border-b-2 border-blue-600">Home</li>
        <li>How It Works</li>
        <li>Features</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>

      <Link to="/login">
        <button className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold">
          Get Started
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;
