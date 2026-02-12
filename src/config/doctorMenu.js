import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  BeakerIcon,
  PencilSquareIcon,
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const doctorMenu = [
  { name: "Dashboard", path: "/doctor/dashboard", icon: HomeIcon },
  { name: "My Patients", path: "/doctor/patients", icon: UsersIcon },
  { name: "Daily Logs", path: "/doctor/logs", icon: ClipboardDocumentListIcon },
  { name: "Vitals", path: "/doctor/vitals", icon: HeartIcon },
  { name: "Prescriptions", path: "/doctor/prescriptions", icon: BeakerIcon },
  { name: "Medical Notes", path: "/doctor/notes", icon: PencilSquareIcon },
  { name: "Alerts", path: "/doctor/alerts", icon: BellAlertIcon },
  { name: "Messages", path: "/doctor/messages", icon: ChatBubbleLeftRightIcon },
  { name: "Appointments", path: "/doctor/appointments", icon: CalendarDaysIcon },
  { name: "Reports", path: "/doctor/reports", icon: ChartBarIcon },
  { name: "Settings", path: "/doctor/profile", icon: Cog6ToothIcon },
];
