"use client";

import InputGroup from "@/components/input-group";
import TypographyH1 from "@/components/typography/typography-h1";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type Auth = {
  isLoggedIn: boolean;
  email: string;
};

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");

  const onSubmit = () => {
    let account: Auth = {
      email: "",
      isLoggedIn: false,
    };

    if (email === "" || !email.includes("@")) {
      setError("Email wajib diisi");
      return false;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return false;
    }

    account = {
      email: email,
      isLoggedIn: true,
    };

    localStorage.setItem("account-user", JSON.stringify(account));

    setError("");
    router.replace("/product");
    return true;
  };

  useEffect(() => {
    let account: Auth = {
      email: "",
      isLoggedIn: false,
    };

    const data = localStorage.getItem("account-user");

    if (!data) {
      localStorage.setItem("account-user", JSON.stringify(account));
      return;
    }

    account = JSON.parse(data);

    if (window.location.pathname !== "/product" && account.isLoggedIn) {
      router.replace("/product");
    }
  }, [router]);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="min-w-sm">
        <TypographyH1 className="text-center mb-6">Login</TypographyH1>
        <form action="" className="w-full space-y-5">
          {error && <p className="text-center text-sm text-red-700">{error}</p>}
          <InputGroup
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          >
            Email
          </InputGroup>
          <InputGroup
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          >
            Password
          </InputGroup>
          <button
            type="button"
            onClick={onSubmit}
            className="w-full text-center py-1.5 text-sm text-white bg-blue-700 rounded-md mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
