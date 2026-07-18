"use client";

import type { Auth } from "@/app/login/page";
import CardProduct from "@/components/card-product";
import Input from "@/components/input";
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
  const [keyword, setKeyword] = useState<string>("");

  const productFiltered = data.products.filter((product) =>
    product.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()),
  );

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

  console.log(keyword);
  console.log(productFiltered);

  return (
    <ContainerLayout>
      <div className="w-full mb-7">
        <Input
          type="text"
          placeholder="Search..."
          className="w-72"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {productFiltered.length > 0 ? (
          productFiltered.map((product) => (
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
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-4 py-24">
            <h3 className="font-semibold text-6xl text-zinc-600 text-center">
              404
            </h3>
            <p className="font-medium text-base text-zinc-600 text-center">
              Product is not found
            </p>
          </div>
        )}
      </div>
    </ContainerLayout>
  );
}
