import { calculateCartTotals } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import PriceFormat from "./PriceFormat";
import { motion } from "framer-motion";
import { store } from "@/lib/store";

const CartSummary = () => {
  const { cartProduct } = store();
  const { data: session } = useSession();
  const { totalAmt } = calculateCartTotals();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartProduct,
          email: session?.user?.email,
        }),
      });

      const result = await response.json();
      const checkoutUrl = await result?.url;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }

      if (result?.error) {
        alert(result?.error?.message);
      }
    } catch (error) {
      console.log("Payment Error", error);
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mt-16 lg:mt-0 rounded-3xl bg-gradient-to-b from-gray-50 to-white shadow-xl px-8 py-10 border border-gray-200 lg:col-span-5 hover:shadow-2xl duration-300"
    >
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Order Summary
          </h2>
          <span className="text-sm text-gray-500 font-medium bg-gray-100 ml-6 px-3 py-1 rounded-full border border-gray-200">
            Secure Checkout
          </span>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          {/* SUBTOTAL */}
          <div className="flex items-center justify-between">
            <dt className="text-sm font-medium text-gray-700">Subtotal</dt>
            <dd className="text-base font-bold text-gray-900">
              <PriceFormat amount={totalAmt?.regular} />
            </dd>
          </div>

          {/* DISCOUNT */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="text-sm font-medium text-gray-700">Total Discount</dt>
            <dd className="text-base font-bold text-green-700">
              <PriceFormat amount={totalAmt?.discounted} />
            </dd>
          </div>

          {/* PAYABLE */}
          <div className="flex items-center justify-between border-t border-gray-300 pt-4">
            <dt className="text-lg font-semibold text-gray-900">Payable Amount</dt>
            <dd className="text-2xl font-extrabold text-black tracking-tight">
              <PriceFormat amount={totalAmt?.regular - totalAmt?.discounted} />
            </dd>
          </div>
        </div>

        {/* CHECKOUT BUTTON */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          disabled={!session?.user || loading}
          type="submit"
          onClick={handlePayment}
          className="w-full mt-4 rounded-2xl bg-black px-6 py-4 text-lg font-semibold text-white shadow-lg hover:bg-gray-900 hover:shadow-xl duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Checkout
        </motion.button>
      </div>
    </motion.section>
  );
};
export default CartSummary;