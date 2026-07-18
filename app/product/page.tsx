"use client";

import ProductFragment from "@/fragments/product/product.fragment";
import ProtectedRouter from "@/layouts/protected-router";

export default function Page() {
  return (
    <ProtectedRouter>
      <ProductFragment />
    </ProtectedRouter>
  );
}
