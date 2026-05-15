import { Suspense } from "react";
import EditProduct from "./Editproductsclient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EditProduct />
    </Suspense>
  );
}