import React, { useState } from "react";

// --- Data ---
const regions = [
  { id: "kigali", name: "Kigali City", aqi: 45, status: "Moderate", color: "bg-yellow-400" },
  { id: "north", name: "Northern Province", aqi: 12, status: "Excellent", color: "bg-emerald-400" },
  { id: "south", name: "Southern Province", aqi: 28, status: "Good", color: "bg-emerald-300" },
  { id: "east", name: "Eastern Province", aqi: 32, status: "Moderate", color: "bg-yellow-300" },
  { id: "west", name: "Western Province", aqi: 22, status: "Good", color: "bg-emerald-300" },
];

// --- Subcomponents ---
type LegendItemProps = { color: string; label: string };
const LegendItem: React.FC<LegendItemProps> = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`0dofrx6h w-4 h-4 rounded ${color}`}></div>
    <span className="text-xs">{label}</span>
  </div>
);

type TriggerItemProps = { label: string; val: number };
const TriggerItem: React.FC<TriggerItemProps> = ({ label, val }) => (
  <div className="flex justify-between text-sm">
    <span>{label}</span>
    <span>{val}</span>
  </div>
);

// --- Main Component ---
const MapForecast: React.FC = () => {
  const [selected, setSelected] = useState(regions[0]);

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Map & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Map Visualization */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-md border border-slate-100 relative h-[500px]">
          <h3 className="text-lg font-bold mb-4">Rwanda AQI Map</h3>

          <div className="relative w-full h-full bg-slate-50 rounded-2xl flex items-center justify-center">
            {regions.map((region) => (
              <div
                key={region.id}
                onClick={() => setSelected(region)}
                className={`0ppfh4yu absolute w-28 h-20 ${region.color} rounded-full opacity-60 hover:opacity-100 cursor-pointer flex items-center justify-center text-xs font-bold text-slate-900`}
                style={{
                  top:
                    region.id === "north"
                      ? "10%"
                      : region.id === "south"
                      ? "70%"
                      : region.id === "east"
                      ? "40%"
                      : region.id === "west"
                      ? "40%"
                      : "40%",
                  left:
                    region.id === "north"
                      ? "40%"
                      : region.id === "south"
                      ? "40%"
                      : region.id === "east"
                      ? "70%"
                      : region.id === "west"
                      ? "10%"
                      : "50%",
                }}
              >
                {region.name.split(" ")[0]}
              </div>
            ))}

            {/* AQI Legend */}
            <div className="absolute bottom-4 left-4 space-y-2">
              <LegendItem color="bg-emerald-400" label="Excellent (0-20)" />
              <LegendItem color="bg-emerald-300" label="Good (21-40)" />
              <LegendItem color="bg-yellow-300" label="Moderate (41-60)" />
              <LegendItem color="bg-orange-400" label="Poor (61-100)" />
              <LegendItem color="bg-red-500" label="Dangerous (100+)" />
            </div>
          </div>
        </div>

        {/* Region Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100">
            <h3 className="text-xl font-bold mb-2">{selected.name}</h3>
            <p className="text-sm text-slate-500 mb-4">Current Forecast Data</p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 uppercase">Current AQI</p>
                <p className="text-3xl font-bold text-slate-800">{selected.aqi}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 uppercase">Status</p>
                <p className="text-lg font-semibold text-slate-700">{selected.status}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 uppercase mb-2">Top Regional Triggers</p>
                <TriggerItem label="Traffic PM2.5" val={selected.id === "kigali" ? 85 : 12} />
                <TriggerItem label="Night Humidity" val={selected.id === "west" ? 90 : 65} />
              </div>
            </div>
          </div>

          <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-lg">
            <h4 className="font-bold mb-2">Asthma Advice</h4>
            <p className="text-sm">
              On moderate AQI days, limit outdoor exercise and carry your inhaler.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapForecast;
