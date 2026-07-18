"use client";

import DetailProductFragment from "@/fragments/detail-product/detail-product.fragment";
import ProtectedRouter from "@/layouts/protected-router";

export default function Page() {
  return (
    <ProtectedRouter>
      <DetailProductFragment />
    </ProtectedRouter>
  );
}
