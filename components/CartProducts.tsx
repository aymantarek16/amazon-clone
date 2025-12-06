"use client";

import { store } from "@/lib/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import CartProduct from "./CartProduct";
import { Product } from "@/type";
import CartSummary from "./CartSummary";

const CartProducts = () => {
  const { cartProduct } = store();

  const isEmpty = !cartProduct?.length;

  return (
    <div>
      {/* ------------------ EMPTY CART ------------------ */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="flex flex-col items-center gap-6 p-10 rounded-2xl shadow-lg bg-white max-w-xl w-full">
            <h2 className="text-2xl font-semibold text-amazonBlue tracking-wide text-center flex items-center gap-2 justify-center">
              <ShoppingCart className="w-7 h-7 text-amazonOrangeDark" />
              Your Cart is Empty
            </h2>

            <p className="text-base text-gray-600 leading-7 text-center">
              Looks like you haven’t added anything to your cart yet. Discover
              our latest deals and top-rated products curated just for you.
            </p>

            <Link
              href={"/"}
              className="mt-4 px-8 py-3 rounded-xl font-medium text-amazonBlue bg-amazonYellow hover:bg-amazonYellowDark transition-all shadow-md hover:shadow-lg"
            >
              Go to Shopping
            </Link>
          </div>
        </div>
      ) : (
        /* ------------------ CART FULL ------------------ */
        <div className="bg-white my-10 flex flex-col gap-4 items-center justify-center py-5 rounded-lg border border-gray-200 drop-shadow-2xl">
          <h1 className="text-3xl inline-flex justify-center items-center gap-4 font-bold tracking-wide text-gray-900 sm:text-4xl">
            Shopping Cart
            <ShoppingCart size={35} />
          </h1>

          <div className="mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
            {/* LEFT SIDE PRODUCTS */}
            <section className="lg:col-span-7 w-full">
              <div className="divide-y divide-gray-200 border-b border-t border-gray-200">
                {cartProduct?.map((product: Product) => (
                  <CartProduct key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* RIGHT SIDE SUMMARY */}
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartProducts;
