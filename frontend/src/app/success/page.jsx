"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    console.log("SESSION:", sessionId);

    // لو حابب فقط تأكيد UI
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <div className="text-center mt-5">
      <h2 className="text-success">Payment Successful 🎉</h2>
      <p>Redirecting...</p>
    </div>
  );
}