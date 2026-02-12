import { useState } from "react";
import RoleBasedSidebar from "./RoleBasedSidebar";

export default function AppLayout({ role, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="0j3t82cj flex">
      <RoleBasedSidebar
        role={role}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main className="0nhjpsb8 flex-1 p-6 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  );
}
