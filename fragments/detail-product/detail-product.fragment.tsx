import Button from "@/components/button";
import ErrorHandle from "@/components/error-handle";
import NotFound from "@/components/not-found";
import DetailProductSkeleton from "@/fragments/detail-product/detail-product-skeleton";
import ContainerLayout from "@/layouts/container-layout";
import { getProductById } from "@/services/product.service";
import type { ProductResponse } from "@/types/product.type";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function DetailProductFragment() {
  const { id } = useParams();
  const [detailProduct, setDetailProduct] = useState<ProductResponse>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    rating: 0,
    category: "",
    thumbnail: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const getData = useCallback(async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const dataDetail = await getProductById(Number(id));
      setDetailProduct(dataDetail);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <ContainerLayout>
      {isLoading ? (
        <DetailProductSkeleton />
      ) : isError ? (
        <ErrorHandle onRetry={getData} />
      ) : "message" in detailProduct ? (
        <NotFound url="/product">Product is not found</NotFound>
      ) : (
        <div className="w-full flex flex-col gap-5 md:flex-row md:gap-7 ">
          <div className="w-full h-1/2 bg-white rounded-md md:h-full md:w-1/2 lg:w-[40%] lg:rounded-xl">
            <Image
              src={detailProduct.thumbnail}
              alt={detailProduct.title}
              width={100}
              height={100}
              unoptimized
              className="mx-auto min-w-64 md:w-full"
            />
          </div>
          <div className="w-full h-1/2 flex flex-col md:h-auto md:w-1/2 lg:w-[60%] md:justify-between">
            <div className="w-full">
              <h2 className="font-bold text-2xl md:text-xl lg:text-2xl">
                {detailProduct.title}
              </h2>
              <div className="w-full flex justify-between items-center mt-2 lg:mt-3">
                <div className="px-3 py-1 bg-blue-800 rounded-md font-medium text-sm lg:px-5">
                  {detailProduct.category}
                </div>
                <p className="font-medium text-base text-yellow-400">
                  ⭐ {detailProduct.rating}
                </p>
              </div>

              <div className="w-full mt-5 md:mt-3">
                <h4 className="font-semibold text-zinc-400 text-lg md:text-base">
                  Description
                </h4>
                <div className="p-4 rounded-md bg-zinc-900 mt-3 lg:rounded-lg">
                  <p className="text-sm text-zinc-400">
                    {detailProduct.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full mt-5">
              <p className="font-semibold text-xl md:text-lg lg:text-xl">
                ${detailProduct.price}
              </p>
              <div className="flex gap-3 mt-5 md:mt-3 lg:mt-4">
                <Link href={"/product"} className="flex-1">
                  <Button className="bg-white text-black w-full hover:bg-white/70">
                    Back
                  </Button>
                </Link>
                <Button className="bg-blue-800 flex-1 hover:bg-blue-900">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ContainerLayout>
  );
}
