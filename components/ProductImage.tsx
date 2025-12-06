"use client";

import { Product } from "@/type";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const ProductImage = ({ product }: { product: Product }) => {
  const [imgUrl, setImgUrl] = useState(product.images[0]);

  return (
    <div className="flex gap-5 items-start">

      {/* Side images */}
      <div className="flex flex-col gap-2 w-28">
        {product?.images?.map((item, index) => (
          <Image
            src={item}
            key={index}
            width={200}
            height={200}
            alt="subImage"
            priority
            className={`w-24 h-24 object-contain cursor-pointer border 
              rounded-md hover:opacity-100 hoverEffect 
              ${imgUrl === item ? "border-gray-600 opacity-100" : "border-gray-200 opacity-70"}`}
            onClick={() => setImgUrl(item)}
          />
        ))}
      </div>

      {/* Main image */}
      <motion.div
        initial={{ opacity: 0 , scale: 0.7}}
        animate={{ opacity: 1 , scale: 1}}
        transition={{ duration: 1}}
        className="bg-gray-100 rounded-md w-full h-[550px] flex items-center justify-center"
      >
        {imgUrl && (
          <Image
            src={imgUrl}
            width={500}
            height={500}
            alt="mainImage"
            priority
            className="w-full h-full object-contain"
          />
        )}
      </motion.div>

    </div>
  );
};

export default ProductImage;
