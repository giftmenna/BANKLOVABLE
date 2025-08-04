import { FC } from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: FC<LogoProps> = ({ className, showText }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="50"
      viewBox="0 0 150 50"
      className={cn("h-12 w-36", className)}
    >
      {/* Icon: Stylized NB inside a tilted square */}
      <g>
        {/* Tilted square background */}
        <path
          d="M12 12 L38 12 L38 38 L12 38 Z"
          fill="#1C2526"
          transform="rotate(-5, 25, 25)"
        />
        
        {/* Stylized N and B */}
        <g transform="translate(15, 15) scale(0.7)">
          {/* N */}
          <path
            d="M5 5 V25 M5 5 L15 25 M15 25 V5"
            fill="none"
            stroke="#FFD700"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* B */}
          <path
            d="M25 5 V25 M25 5 C30 5, 33 8, 33 12 C33 16, 30 18, 25 18 C30 18, 33 20, 33 24 C33 28, 30 25, 25 25"
            fill="none"
            stroke="#FFC107"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Artistic dot */}
          <circle cx="15" cy="5" r="1" fill="#FFD700" />
        </g>
      </g>

      {/* Text: NIVALUS */}
      <text
        x="50"
        y="33"
        fill="#E0E0E0"
        fontFamily="Inter, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="1.2"
      >
        NIVALUS
      </text>

      {/* Subtext: BANK */}
      <text
        x="50"
        y="45"
        fill="#FFD700"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="500"
        letterSpacing="0.5"
      >
        BANK
      </text>
    </svg>
  );
}