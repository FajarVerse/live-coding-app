"use client";

import type { Auth } from "@/app/login/page";
import ContainerLayout from "@/layouts/container-layout";
import { getProduct } from "@/services/product.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type Product = {
  id: number;
  price: number;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
};

type GetProducts = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<GetProducts>({
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  });

  const onLogout = () => {
    localStorage.removeItem("account-user");
    router.replace("/login");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const dataProduct = await getProduct();
        setData(dataProduct);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("account-user");

    if (!data) {
      router.replace("/login");
      return;
    }
    const auth: Auth = JSON.parse(data);

    if (!auth.isLoggedIn && window.location.pathname !== "/login") {
      router.replace("/login");
    }
  }, [router]);

  return (
    <ContainerLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.products &&
          data.products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="h-auto rounded-2xl p-5 border border-zinc-700 lg:p-4">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="h-1/2 w-full rounded-sm bg-white lg:rounded-lg"
                />
                <div className="mt-2.5 flex flex-col gap-1">
                  <div className="w-full flex justify-between">
                    <p className="font-medium text-base text-zinc-400 lg:text-sm">
                      {product.category}
                    </p>
                    <p className="font-medium text-base text-yellow-300 lg:text-sm">
                      ⭐ {product.rating}
                    </p>
                  </div>
                  <h3 className="font-semibold text-lg lg:text-base">
                    {product.title}
                  </h3>
                  <h3 className="font-medium text-xl text-blue-700 lg:text-base text-right mt-1">
                    $ {product.price}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </ContainerLayout>
  );
}
