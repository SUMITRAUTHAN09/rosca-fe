"use client";
import { useRouter } from "next/navigation";
import { Typography } from "./typography";
export default function BackArrow() {
  const router = useRouter();
  return (
    <div
      className="absolute top-4 left-6 z-20 cursor-pointer"
      onClick={() => router.back()}
    >
      <Typography variant="link" className="text-white">
        ←
      </Typography>
    </div>
  );
}
