"use client";

export function VatikaLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vatika Naturals Logo"
    >
      {/* Leaf shape */}
      <ellipse cx="50" cy="45" rx="30" ry="40" fill="#2F7D32" transform="rotate(-15 50 45)" />
      <ellipse cx="50" cy="45" rx="25" ry="35" fill="#5AAE4A" transform="rotate(-15 50 45)" />

      {/* Inner vein */}
      <path
        d="M50 10 Q48 45 50 80"
        stroke="#1B4332"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M50 30 Q60 35 65 30"
        stroke="#1B4332"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M50 40 Q38 45 33 40"
        stroke="#1B4332"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M50 50 Q62 55 68 50"
        stroke="#1B4332"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />

      {/* V letter */}
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fill="#F8FFF5"
        fontSize="28"
        fontWeight="bold"
        fontFamily="serif"
      >
        V
      </text>

      {/* Drop */}
      <path
        d="M75 70 Q80 60 85 70 Q85 78 80 80 Q75 78 75 70Z"
        fill="#FFD54F"
        opacity="0.9"
      />
    </svg>
  );
}

export function VatikaWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <VatikaLogo size={36} />
      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-wider text-[#1B4332]">VATIKA</span>
        <span className="text-[10px] tracking-[0.2em] text-[#5AAE4A] font-medium">NATURALS</span>
      </div>
    </div>
  );
}
