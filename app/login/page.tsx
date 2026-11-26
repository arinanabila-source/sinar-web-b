"use client";

import LoginNavbar from "./LoginNavbar";
import LoginFooter from "./LoginFooter";
import LoginCard from "./LoginCard";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <LoginNavbar />

      <section className="flex-1 flex items-center justify-center px-4 py-8 md:py-10">
        <div className="w-full max-w-6xl">
          <LoginCard />
        </div>
      </section>

      <LoginFooter />
    </main>
  );
}