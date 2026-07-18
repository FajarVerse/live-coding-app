import Input from "@/components/input";
import SelectButton from "@/components/select-button";
import ProductContent from "@/fragments/product/product-content";
import ContainerLayout from "@/layouts/container-layout";
import { getProduct } from "@/services/product.service";
import type { Option } from "@/types/option.type";
import type { GetProductResponse } from "@/types/product.type";
import { useEffect, useState } from "react";

const categories: Option<string>[] = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Groceries",
    value: "groceries",
  },
  {
    label: "Furniture",
    value: "furniture",
  },
  {
    label: "Fragrances",
    value: "fragrances",
  },
  {
    label: "Beauty",
    value: "beauty",
  },
];

const sortOptions: Option<string>[] = [
  {
    label: "Default",
    value: "default",
  },
  {
    label: "Lowest Price",
    value: "lowest-price",
  },
  {
    label: "Highest Price",
    value: "highest-price",
  },
  {
    label: "Lowest Rating",
    value: "lowest-rating",
  },
  {
    label: "Highest Rating",
    value: "highest-rating",
  },
];

export default function ProductFragment() {
  const [data, setData] = useState<GetProductResponse>({
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [showSort, setShowSort] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      try {
        const dataProduct = await getProduct();
        setData(dataProduct);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

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

  return (
    <ContainerLayout>
      <div className="w-full mb-7 flex items-center justify-between">
        <Input
          type="text"
          placeholder="Search..."
          className="md:w-72"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <div className="flex gap-3">
          <SelectButton
            options={categories}
            showSelected={showCategory}
            setShowSelected={setShowCategory}
            setValue={setCategory}
          >
            Filter
          </SelectButton>

          <SelectButton
            options={sortOptions}
            showSelected={showSort}
            setShowSelected={setShowSort}
            setValue={setSortBy}
          >
            Sort By
          </SelectButton>
        </div>
      </div>
      <ProductContent
        products={productFiltered}
        isLoading={isLoading}
        isError={isError}
      />
    </ContainerLayout>
  );
}
