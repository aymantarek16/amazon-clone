"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-hot-toast";

const SuccessPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const sessionId = searchParams.get("session_id");
  const router = useRouter();
  const resetCart = store((state) => state.resetCart);
  // const { data: session } = useSession();

  // Prevent double execution under Strict Mode
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleSuccess = async () => {
    

      // Redirect if missing info
      if (!sessionId) {
        // Show success toast
        toast.success("Payment received successfully!");
        return router.push("/");
      }

      try {
        const res = await fetch(`/api/get-session?session_id=${sessionId}`);
        const stripeSession = await res.json();

        if (!stripeSession || !stripeSession.customer_email) return;

        const email = encodeURIComponent(stripeSession.customer_email);

        // Save order to Firestore
        await addDoc(collection(db, "users", email, "orders"), {
          amount: stripeSession.amount_total / 100,
          amountShipping: stripeSession.amount_shipping / 100 || 0,
          images: stripeSession.images,
          items: stripeSession.items,
          timestamp: {
            seconds: Math.floor(Date.now() / 1000),
            nanoseconds: 0,
          },
          status: "paid",
        });

        resetCart();
      } catch (error) {
        console.log("Error saving order:", error);
        toast.error("Failed to save your order.");
      }
    };

    handleSuccess();
  }, [router, resetCart, sessionId]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#e8ecf3] to-[#cdd5df] px-4 py-10 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-green-300 to-green-500 blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 blur-3xl opacity-40 animate-pulse"></div>

      <div className="relative bg-white/70 backdrop-blur-2xl shadow-[0_8px_50px_rgba(0,0,0,0.20)] rounded-[35px] p-12 max-w-2xl w-full text-center border border-white/30 animate-[fadeIn_.9s_ease-out]">
        {/* Success Icon */}
        <div className="mb-10 animate-[scaleIn_.7s_ease-out]">
          <div className="w-28 h-28 mx-auto flex items-center justify-center rounded-full bg-green-100 shadow-xl border border-green-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6L19.5 6"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl font-black mb-6 text-gray-900 tracking-tight drop-shadow-sm">
          Payment Successful
        </h1>

        <p className="text-gray-700 text-xl leading-relaxed mb-12 font-medium">
          Your payment has been securely processed by
          <span className="font-bold text-gray-900"> amazonpro.com</span>.
          <br />
          You can now check your orders or continue shopping.
        </p>

        <div className="flex items-center justify-center gap-8">
          <Link
            href="/"
            className="px-8 py-4 rounded-full font-semibold bg-gray-900 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;
