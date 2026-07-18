"use client";

import type { Auth } from "@/app/login/page";
import CardProduct from "@/components/card-product";
import ContainerLayout from "@/layouts/container-layout";
import { getProduct } from "@/services/product.service";
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
      <div className="w-full mb-5"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.products &&
          data.products.map((product) => (
            <CardProduct key={product.id} id={product.id}>
              <CardProduct.Header
                imgUrl={product.thumbnail}
                title={product.title}
              />
              <CardProduct.Body
                title={product.title}
                category={product.category}
                rating={product.rating}
              />
              <CardProduct.Footer price={product.price} />
            </CardProduct>
          ))}
      </div>
    </ContainerLayout>
  );
}
