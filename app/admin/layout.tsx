"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin !== "true") {
      router.replace("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#172B3A] text-[#F5F2EA]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-[#D5B66B]/30 border-t-[#D5B66B]" />
          <p className="text-sm font-medium tracking-wide">
            Loading SINAR...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}