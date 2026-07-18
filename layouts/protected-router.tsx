import type { LoginResponse } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouterProps {
  children: React.ReactNode;
}

export default function ProtectedRouter({ children }: ProtectedRouterProps) {
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("account-user");

    if (!data) {
      router.replace("/login");
      return;
    }
    const auth: LoginResponse = JSON.parse(data);

    if (!auth.isLoggedIn && window.location.pathname !== "/login") {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
