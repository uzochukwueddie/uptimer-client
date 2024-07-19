'use client';

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function NotFoundPage(): JSX.Element {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-6xl font-bold text-green-300 md:text-8xl lg:text-9xl">Oops!</div>
      <p className="mt-5 text-base font-bold text-green-300 md:text-xl lg:text-2xl">Error 404: Page Not Found</p>
      <Button
        onClick={() => router.back()}
        disabled={false}
        className="mt-5 rounded bg-green-400 px-6 py-3 text-center text-sm font-bold text-white hover:bg-green-400 focus:outline-none md:px-4 md:py-2 md:text-base"
        label="Back Home"
      />
    </div>
  );
}