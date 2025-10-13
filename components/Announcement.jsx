"use client";

import { useState } from "react";
import {
  FaTimes,
  FaInfoCircle,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

const Announcement = ({
  title,
  message,
  type = "info",
  dismissible = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  // Define styles based on type
  const typeStyles = {
    info: {
      bg: "bg-blue-100",
      border: "border-blue-500",
      text: "text-blue-700",
      icon: <FaInfoCircle className="inline mr-2" />,
    },
    warning: {
      bg: "bg-yellow-100",
      border: "border-yellow-500",
      text: "text-yellow-700",
      icon: <FaExclamationTriangle className="inline mr-2" />,
    },
    success: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-700",
      icon: <FaCheckCircle className="inline mr-2" />,
    },
  };

  const { bg, border, text, icon } = typeStyles[type] || typeStyles.info;

  return (
    <section
      className={`bg-white shadow mb-5 px-4 py-4 rounded-lg ${bg} ${border} border-l-4`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className={`text-xl font-bold ${text}`}>
            {icon}
            {title}
          </h2>
          <p className={`mt-2 ${text}`}>{message}</p>
        </div>
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className={`text-gray-500 hover:text-gray-700 ${text}`}
            aria-label="Dismiss announcement"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </section>
  );
};

export default Announcement;
