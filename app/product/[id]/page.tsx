"use client";

import type { Product } from "@/app/product/page";
import TypographyH1 from "@/components/typography/typography-h1";
import { getProductById } from "@/services/product.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [detailProduct, setDetailProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    rating: 0,
    category: "",
    thumbnail: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const dataDetail = await getProductById(Number(id));
        console.log(dataDetail);
        setDetailProduct(dataDetail);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  });

  return <TypographyH1>Detail Product</TypographyH1>;
}
