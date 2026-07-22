"use client";

import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FFF5] relative overflow-x-hidden">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
