// layout.tsx
import { ReactNode } from "react";
import "../globals.css";
import type { Metadata } from "next";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
      <div>
        {/* Auth-specific layout components like headers or footers */}
        {children}
      </div>
    );
  }