export default function InfoSection() {
  return (
    <section className="0c127soc grid md:grid-cols-2 gap-10 px-10 py-20 items-center">

      <img
        src="/woman-inhaler.jpg"
        alt="Asthma Device"
        className="0qt8qvdl rounded-xl shadow-lg"
      />

      <div className="038ba6z7 space-y-6">
        <InfoCard
          title="Track Your Progress"
          desc="Monitor your lung function & symptoms"
        />

        <InfoCard
          title="Get Alerts & Reminders"
          desc="Stay on top of your medication"
        />

        <InfoCard
          title="Gain Insights"
          desc="Understand your asthma triggers"
        />
      </div>
    </section>
  );
}

function InfoCard({ title, desc }) {
  return (
    <div className="0g6ucfkg p-6 bg-blue-50 rounded-xl">
      <h4 className="0f7dybql font-semibold text-blue-700">{title}</h4>
      <p className="01up4lv2 text-gray-600 text-sm mt-1">{desc}</p>
    </div>
  );
}
