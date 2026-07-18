import CardProduct from "@/components/card-product";
import ErrorHandle from "@/components/error-handle";
import Skeleton from "@/components/skleton";
import type { ProductResponse } from "@/types/product.type";

interface ProductContentProps {
  getProduct: () => void;
  products: ProductResponse[];
  isLoading: boolean;
  isError: boolean;
}

export default function ProductContent({
  getProduct,
  products,
  isLoading,
  isError,
}: ProductContentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {isLoading ? (
        <>
          <Skeleton className="min-h-96 lg:min-h-72" />
          <Skeleton className="min-h-96 lg:min-h-72" />
          <Skeleton className="min-h-96 lg:min-h-72" />
          <Skeleton className="min-h-96 lg:min-h-72" />
        </>
      ) : isError ? (
        <ErrorHandle onRetry={getProduct} />
      ) : products.length > 0 ? (
        products.map((product) => (
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
  );
}
