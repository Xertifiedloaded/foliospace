import UnauthorizedPage from "@/components/Unauthorize";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnauthorizedPage />
    </Suspense>
  );
}
