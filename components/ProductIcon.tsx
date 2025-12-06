"use client";

import { Product } from "@/type";
import React, { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { toast } from "react-hot-toast";
import { store } from "@/lib/store";

const ProductIcon = ({ product }: { product: Product }) => {
  const { favoriteProduct, addToFavorite } = store();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const availableItem = favoriteProduct?.find(
      (item: { id: number; }) => item?.id === product?.id
    );
    setExistingProduct(availableItem || null);
  }, [favoriteProduct, product?.id]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();

    if (product) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? `${product?.title.substring(0, 10)} Removed from favorites 💔`
            : `${product?.title.substring(0, 10)} Added to favorites ❤️`
        );
      });
    }
  };

  return (
    <div className="absolute top-2 right-2 flex items-center gap-2 z-50">
      {product?.discountPercentage ? (
        <p className="bg-transparent text-amazonBlue border border-amazonBlue group-hover:bg-amazonBlue group-hover:text-white text-xs rounded-full py-1 px-2 hoverEffect">
          {product.discountPercentage}%
        </p>
      ) : null}

      <span
        onClick={handleFavorite}
        className={`text-xl cursor-pointer transition-all duration-300 rounded-full p-1 ${existingProduct
          ? "bg-red-500 text-white"
          : "bg-transparent text-gray-600 hover:bg-red-100"
          }`}
      >
        {existingProduct ? <MdFavorite /> : <MdFavoriteBorder />}
      </span>
    </div>
  );
};

export default ProductIcon;
