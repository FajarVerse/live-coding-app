"use client";

import type { Auth } from "@/app/login/page";
import ContainerLayout from "@/layouts/container-layout";
import Header from "@/layouts/header";
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
      <div className="w-full flex gap-5 flex-wrap">
        {data.products &&
          Array.isArray(data.products) &&
          data.products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="h-auto bg-zinc-700 border-2 border-white rounded-md min-w-80 p-3">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="h-1/2  w-full rounded-sm "
                />
                <div className="mt-2 flex flex-col gap-3">
                  <div className="w-full flex justify-between">
                    <p className="font-medium text-sm text-zinc-400">
                      {product.category}
                    </p>
                    <p className="font-medium text-sm text-yellow-300">
                      {product.rating}
                    </p>
                  </div>
                  <h3 className="font-semibold text-xl">{product.title}</h3>
                  <h3 className="font-semibold text-xl text-blue-700">
                    {product.price}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </ContainerLayout>
  );
}
