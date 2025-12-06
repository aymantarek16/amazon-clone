import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductIcon from "./ProductIcon";
import { Product } from "@/type";
import AddToCartBtn from "./AddToCartBtn";
import PriceFormat from "./PriceFormat";
import { TooltipText } from "./ToolTip";

const ProductCard = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "border border-gray-200 hover:border-amazonLight/30 rounded-md bg-white overflow-hidden z-10 hoverEffect flex flex-col h-full",
        className
      )}
    >
      {/* Product Image */}
      <div className="relative group overflow-hidden h-72 w-full flex-shrink-0">
        <Link href={`/product/${product?.id}`} className="h-full block">
          <Image
            src={product?.images[0]}
            alt={product?.title}
            width={600}
            height={600}
            loading="lazy"
            className="w-full h-full object-contain bg-[#f8f8f8] group-hover:scale-110 hoverEffect"
          />
          <ProductIcon product={product} />
        </Link>
      </div>

      {/* Product Content */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div className="flex-1">
          {/* Product Title */}
          <h2 className="text-sm md:text-base font-medium line-clamp-2  pt-2">
            {product?.title}
          </h2>

          {/* Product Description */}
          <TooltipText text={product?.description}>
            <p className="text-sm md:text-base text-gray-600  pt-1 line-clamp-2 mb-2 cursor-default">
              {product?.description.slice(0, 60)}...
            </p>
          </TooltipText>

          {/* Category */}
          <p className="text-sm md:text-base text-gray-500 my-1">
            Category:{" "}
            <span className="capitalize font-semibold text-black">
              {product?.category}
            </span>
          </p>

          {/* Price */}
          <PriceFormat amount={product?.price} />

          {/* Rating */}
          <div className="flex items-center  mt-2">
            <span className="text-yellow-500 font-semibold mr-1">
              &#9733; {product?.rating}
            </span>
            <span className="text-gray-500 text-sm relative top-0.3">
              ({product?.reviews?.length || 0} reviews)
            </span>
          </div>
        </div>

        {/* Add to Cart Button (fixed at bottom) */}
        <div className="mt-3">
          <AddToCartBtn product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
