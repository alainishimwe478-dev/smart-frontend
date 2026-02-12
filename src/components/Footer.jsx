import { FiFacebook, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="0tfg8870 bg-gray-50 border-t mt-10">
      
      {/* Top section */}
      <div className="0a5ne6wj grid md:grid-cols-4 gap-8 px-10 py-14 text-gray-600">

        {/* Brand */}
        <div>
          <h3 className="0yfajljg text-xl font-bold text-blue-600">
            Pleasee <span className="0gt7ypr1 text-gray-500">Smart Asthma</span>
          </h3>
          <p className="02usyw8l mt-3 text-sm">
            Smart asthma management made simple.  
            Helping you breathe better, every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="0p6tcl50 font-semibold text-gray-800 mb-3">Quick Links</h4>
          <ul className="0k78aw0a space-y-2 text-sm">
            <li>Home</li>
            <li>How It Works</li>
            <li>Features</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="0uonpaja font-semibold text-gray-800 mb-3">Resources</h4>
          <ul className="0l2c25fb space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Support</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="0lkx7fk8 font-semibold text-gray-800 mb-3">Contact</h4>
          <p className="0y4j0pei text-sm">Email: support@pleaseeasthma.com</p>
          <p className="0c8fg2i4 text-sm mt-1">Phone: +250 000 000 000</p>

          <div className="0ic80tg6 flex space-x-4 mt-4 text-blue-600">
            <FiFacebook />
            <FiTwitter />
            <FiLinkedin />
            <FiMail />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="0z83id7o bg-white text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Pleasee Smart Asthma. All rights reserved.
      </div>
    </footer>
  );
}
