import React from "react";

export const AppIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g fill="currentColor">
        {/* New path for the first part of the food icon */}
        <path
          d="M4.688 4.944L3.275 6.358 5.137 8.22l1.415-1.414L4.688 4.944zm3.914 0l-1.414 1.414 2.527 2.527 1.414-1.414-2.527-2.527zm3.914 0l-1.414 1.414 2.527 2.527 1.414-1.414-2.527-2.527zm-1.828 4.828l1.414 1.414-1.414 1.414-1.414-1.414 1.414-1.414zm-6.773-6.172L3.275 5.686 5.137 7.548l1.415-1.414L4.688 2.6z"
        />
        {/* New path for the second part of the food icon */}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2 4h12v8H2V4zm0-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
        />
      </g>
    </svg>
  );
};
