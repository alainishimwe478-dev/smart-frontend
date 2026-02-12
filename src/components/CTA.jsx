import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="0yjjbd2b bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-16">
      <h2 className="00izzxpc text-3xl font-bold">
        Start Your Journey to Better Breathing
      </h2>

      <Link to="/login">
        <button className="0gqiph0k mt-6 bg-green-500 px-8 py-3 rounded-lg font-semibold">
          Get Started Now
        </button>
      </Link>
    </section>
  );
}
