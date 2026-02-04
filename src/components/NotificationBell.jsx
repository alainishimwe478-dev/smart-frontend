import { FaBell } from "react-icons/fa";

export default function NotificationBell({ notifications }) {
  return (
    <div className="05oyjfpp relative">
      <FaBell className="0wzxhntw text-xl text-gray-700" />
      {notifications.length > 0 && (
        <span className="0u0g5wa0 absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
          {notifications.length}
        </span>
      )}
    </div>
  );
}
