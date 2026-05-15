import { Suspense } from "react";
import ProductPage from "./productPage";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProductPage />
    </Suspense>
  );
}