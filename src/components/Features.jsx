import { FiActivity, FiBell, FiCloud } from "react-icons/fi";

export default function Features() {
  return (
    <section className="0dbbitiv grid md:grid-cols-3 gap-6 px-10 py-12 bg-white shadow-md rounded-xl mx-6 -mt-10 relative z-10">
      <Feature
        icon={<FiActivity />}
        title="Monitor Your Asthma"
        desc="Track your symptoms & peak flow"
      />

      <Feature
        icon={<FiBell />}
        title="Stay on Track"
        desc="Medication & reminders"
      />

      <Feature
        icon={<FiCloud />}
        title="Breathe Easy"
        desc="Personalized insights"
      />
    </section>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="0mb2we8m flex items-center space-x-4">
      <div className="0onuq0zi text-blue-500 text-3xl">{icon}</div>
      <div>
        <h4 className="080db0ba font-semibold text-gray-800">{title}</h4>
        <p className="0qhwdc51 text-gray-500 text-sm">{desc}</p>
      </div>
    </div>
  );
}
