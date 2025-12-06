"use client";

import { store } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import PriceFormat from "./PriceFormat";
import AddToCartBtn from "./AddToCartBtn";

const FavoriteProducts = () => {
  const { favoriteProduct } = store();

  return (
    <div className="mt-5">
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="p-3 text-left">Product Info</th>
              <th className="p-3 text-left hidden md:table-cell">Category</th>
              <th className="p-3 text-left hidden md:table-cell">Brand</th>
              <th className="p-3 text-left hidden md:table-cell">Status</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {favoriteProduct?.map((product) => (
              <tr
                key={product?.id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* PRODUCT INFO */}
                <td className="p-3 flex items-center gap-3">
                  
                  {/* IMAGE ON ALL DEVICES */}
                  <Link
                    href={`/product/${product.id}`}
                    className="border rounded-md overflow-hidden group"
                  >
                    <Image
                      src={product.images[0]}
                      alt="product image"
                      height={80}
                      width={80}
                      priority
                      className="object-contain h-16 w-16 md:h-20 md:w-20 group-hover:scale-105 transition"
                    />
                  </Link>

                  {/* TEXT CONTENT */}
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-medium capitalize">
                      {product.brand}
                    </span>
                    <span className="text-xs text-gray-500 md:hidden capitalize">
                      {product.category}
                    </span>
                  </div>
                </td>

                {/* CATEGORY (desktop only) */}
                <td className="p-3 capitalize hidden md:table-cell">
                  {product.category}
                </td>

                {/* BRAND (desktop only) */}
                <td className="p-3 capitalize hidden md:table-cell">
                  {product.brand}
                </td>

                {/* STATUS */}
                <td
                  className={`p-3 hidden md:table-cell text-sm font-medium ${
                    product.availabilityStatus === "In Stock"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {product.availabilityStatus}
                </td>

                {/* PRICE */}
                <td className="p-3 font-semibold">
                  <PriceFormat
                    amount={
                      product.quantity
                        ? product.quantity * product.price
                        : product.price
                    }
                  />
                </td>

                {/* ACTION BUTTON — FULL WIDTH FIX */}
                <td className="px-3">
                  <div className="flex justify-center items-center">
                    <AddToCartBtn
                      product={product}
                      showSubtotal={false}
                      className="px-3 text-xs md:text-sm"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavoriteProducts;
