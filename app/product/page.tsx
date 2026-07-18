"use client";

import type { Auth } from "@/app/login/page";
import Button from "@/components/button";
import CardProduct from "@/components/card-product";
import Input from "@/components/input";
import ContainerLayout from "@/layouts/container-layout";
import { getProduct } from "@/services/product.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const categories: { name: string; value: string }[] = [
  {
    name: "All",
    value: "",
  },
  {
    name: "Groceries",
    value: "groceries",
  },
  {
    name: "Furniture",
    value: "furniture",
  },
  {
    name: "Fragrances",
    value: "fragrances",
  },
  {
    name: "Beauty",
    value: "beauty",
  },
];

const sortOptions: { name: string; value: string }[] = [
  {
    name: "Default",
    value: "default",
  },
  {
    name: "Lowest Price",
    value: "lowest-price",
  },
  {
    name: "Highest Price",
    value: "highest-price",
  },
  {
    name: "Lowest Rating",
    value: "lowest-rating",
  },
  {
    name: "Highest Rating",
    value: "highest-rating",
  },
];

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
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [showSort, setShowSort] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const productFiltered = data.products.filter((product) => {
    const sameKeyword =
      keyword === "" ||
      product.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
    const sameCategory = category === "" || product.category === category;
    return sameKeyword && sameCategory;
  });

  switch (sortBy) {
    case "lowest-price":
      productFiltered.sort((a, b) => a.price - b.price);
      break;
    case "highest-price":
      productFiltered.sort((a, b) => b.price - a.price);
      break;
    case "lowest-rating":
      productFiltered.sort((a, b) => a.rating - b.rating);
      break;
    case "highest-rating":
      productFiltered.sort((a, b) => b.rating - a.rating);
      break;

    default:
      break;
  }

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
      <div className="w-full mb-7 flex items-center justify-between">
        <Input
          type="text"
          placeholder="Search..."
          className="w-72"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <div className="flex gap-3">
          <div className="w-fit relative">
            <Button
              type="button"
              onClick={() => setShowCategory(!showCategory)}
              className="bg-blue-800"
            >
              Filter
            </Button>
            {showCategory === true && (
              <div className="min-w-40 bg-white rounded-md shadow-md shadow-zinc-600 overflow-hidden absolute top-12 right-1/12">
                {categories.map((category, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCategory(category.value);
                      setShowCategory(false);
                    }}
                    className={`font-medium text-sm text-left w-full py-2 px-5 text-zinc-700 border-b border-zinc-300 hover:bg-blue-800 hover:text-white ${i == categories.length - 1 ? "border-b-0" : ""} `}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-fit relative">
            <Button
              type="button"
              onClick={() => setShowSort(!showSort)}
              className="bg-blue-800"
            >
              Sort By
            </Button>
            {showSort && (
              <div className="min-w-40 bg-white rounded-md shadow-md shadow-zinc-600 overflow-hidden absolute top-12 right-1/12">
                {sortOptions.map((option, i) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSort(false);
                    }}
                    className={`font-medium text-sm text-left w-full py-2 px-5 text-zinc-700 border-b border-zinc-300 hover:bg-blue-800 hover:text-white ${i == sortOptions.length - 1 ? "border-b-0" : ""} `}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
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
