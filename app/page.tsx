"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userCheck } from "./utils/userCheck";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userCheck(setLoading, router);
  }, [router]);

  return (
    <div>
      {!loading && (
        <nav className="flex items-center justify-between">
          <span className="text-3xl font-bold">GroupBy</span>

          <button type="button" className="bg-red-400 text-white py-1 px-3 rounded-md">
            로그아웃
          </button>
        </nav>
      )}
    </div>
  );
}
