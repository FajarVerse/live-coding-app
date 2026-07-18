import Button from "@/components/button";
import Link from "next/link";

interface NotFoundProps {
  children: React.ReactNode;
  url?: string;
}

export default function NotFound({ children, url }: NotFoundProps) {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4 py-24 flex flex-col items-center">
      <h3 className="font-semibold text-6xl text-zinc-600 text-center">404</h3>
      <p className="font-medium text-base text-zinc-600 text-center">
        {children}
      </p>
      {url && (
        <Link href={url}>
          <Button className="hover:border-b-2 rounded-none! mt-3">Back</Button>
        </Link>
      )}
    </div>
  );
}
