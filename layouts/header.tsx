import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const onLogout = () => {
    localStorage.removeItem("account-user");
    router.replace("/login");
  };

  return (
    <header className="w-full py-5 flex justify-end items-center px-5 fixed top-0 left-0 bg-black shadow-md shadow-zinc-800 md:px-10 lg:px-24 xl:px-40 2xl:px-64">
      <Button className="bg-red-700 text-white" onClick={onLogout}>
        Logout
      </Button>
    </header>
  );
}
