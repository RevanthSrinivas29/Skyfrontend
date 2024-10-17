import { Box ,Text} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Loadin = () => {
  const [loading, setLoading] = useState(true); // State to manage loading
  

  return loading ? (
    <Box className="container">
      <Box className="dot dot-1"></Box>
      <Box className="dot dot-2"></Box>
      <Box className="dot dot-3"></Box>

      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur result="blur" stdDeviation="10"></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
            ></feColorMatrix>
          </filter>
        </defs>
      </svg>

      <style>{`
        .container {
          width: 80px; /* Reduced size by 20% */
          height: 80px; /* Reduced size by 20% */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          margin: auto;
          filter: url("#goo");
          animation: rotate-move 2s ease-in-out infinite;
        }

        .dot {
          width: 56px; /* Reduced size by 20% */
          height: 56px; /* Reduced size by 20% */
          border-radius: 50%;
          background-color: #000;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }

        .dot-3 {
          background-color: #ff1717;
          animation: dot-3-move 2s ease infinite, index 6s ease infinite;
        }

        .dot-2 {
          background-color: #0051ff;
          animation: dot-2-move 2s ease infinite, index 6s -4s ease infinite;
        }

        .dot-1 {
          background-color: #ffc400;
          animation: dot-1-move 2s ease infinite, index 6s -2s infinite;
        }

        @keyframes dot-3-move {
          20% {
            transform: scale(1);
          }
          45% {
            transform: translateY(-14px) scale(0.45); /* Adjusted for size */
          }
          60% {
            transform: translateY(-72px) scale(0.45); /* Adjusted for size */
          }
          80% {
            transform: translateY(-72px) scale(0.45); /* Adjusted for size */
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes dot-2-move {
          20% {
            transform: scale(1);
          }
          45% {
            transform: translate(-13px, 10px) scale(0.45); /* Adjusted for size */
          }
          60% {
            transform: translate(-64px, 48px) scale(0.45); /* Adjusted for size */
          }
          80% {
            transform: translate(-64px, 48px) scale(0.45); /* Adjusted for size */
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes dot-1-move {
          20% {
            transform: scale(1);
          }
          45% {
            transform: translate(13px, 10px) scale(0.45); /* Adjusted for size */
          }
          60% {
            transform: translate(64px, 48px) scale(0.45); /* Adjusted for size */
          }
          80% {
            transform: translate(64px, 48px) scale(0.45); /* Adjusted for size */
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes rotate-move {
          55% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          80% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes index {
          0%,
          100% {
            z-index: 3;
          }
          33.3% {
            z-index: 2;
          }
          66.6% {
            z-index: 1;
          }
        }
      `}</style>
    </Box>
  ) : null; // Render null after loading is done
};
