// layout.tsx
import { ReactNode } from "react";
import "../globals.css";
import type { Metadata } from "next";
import NavBar from '@/components/shared/NavBar'
import LeftSideBar from "@/components/shared/LeftSideBar";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Generated by create next app",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <NavBar />
      {children}
    </section>
  );
}