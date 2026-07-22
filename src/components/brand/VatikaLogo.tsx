"use client";

/* eslint-disable @next/next/no-img-element */

export function VatikaLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="Vatika Naturals Logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}

export function VatikaWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <VatikaLogo size={38} />
    </div>
  );
}
