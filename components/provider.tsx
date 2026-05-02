"use client";

import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/lib/types";

interface ProviderProps {
  children: React.ReactNode;
  siteSettings: SiteSettings | null;
}

const Provider = ({ children, siteSettings: _siteSettings }: ProviderProps) => {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default Provider;
