import { Product } from "@/type";
import React from "react";
import ProductImage from "./ProductImage";
import PriceFormat from "./PriceFormat";
import { MdStar } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import AddToCartBtn from "./AddToCartBtn";
import Image from "next/image";
import { paymentImage } from "@/assets";

const SingleProduct = ({ product }: { product: Product }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <ProductImage product={product} />
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-wide">{product?.title}</h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PriceFormat
              amount={product?.price + product?.discountPercentage / 100}
              className="line-through text-gray-500 font-medium text-xl"
            />
            <PriceFormat
              amount={product?.price}
              className="font-bold text-amazonBlue text-xl"
            />
          </div>

          {/* stars rating */}
          <div className="flex items-center gap-1">
            <div className="text-base text-lightText flex items-center">
              {Array?.from({ length: 5 })?.map((_, index) => {
                const filled = index + 1 <= Math.floor(product?.rating);
                const halfFilled = index + 1 > Math.floor(product?.rating) &&
                  index < Math.ceil(product?.rating);
                return <MdStar
                  key={index}
                  className={
                    filled
                      ? "text-amazonOrangeDark"
                      : halfFilled
                        ? "text-amazonOrangeDark"
                        : "text-lightText"
                  }
                />
              })}
            </div>

            <p className="text-sm text-bold">
              {`(${product?.rating.toFixed(1)}) reviews`}
            </p>
          </div>
        </div>

        <p className="flex items-center">
          <FaRegEye className="mr-1" />
          <span className="font-semibold mr-1">250+ </span>
          <span>People are viewing this right now</span>
        </p>

        <p>
          You are saving{" "}
          <span>
            <PriceFormat
              className="font-semibold text-base text-green-500"
              amount={product?.discountPercentage / 100} />
          </span>{" "}
          unpon purchase!
        </p>

        <div>
          <p className="text-sm tracking-wide">{product?.description}</p>
          <p className="text-base">{product?.warrantyInformation}</p>
        </div>

        <p>
          Brand: <span className="font-medium">{product?.brand}</span>
        </p>
        <p>
          Category: <span className="font-medium capitalize">
            {product?.category}
          </span>
        </p>


        <p>
          Tags: {" "}
          {product?.tags?.map((item, index) => (
            <span key={index} className="font-medium capitalize">
              {item}
              {index < product?.tags?.length - 1 && ", "}
            </span>
          ))}
        </p>


        <AddToCartBtn
          product={product}
          className="rounded-md uppercase font-semibold py-3"
          showSubtotal={false}
        />

        <div className="bg-[#f7f7f7] p-5 rounded-md flex flex-col items-center justify-center gap-2">
          <Image
            src={paymentImage}
            className="w-auto object-cover"
            alt="paymentImage"
          />
          <p className="font-semibold">Guaranteed safe & secure checkout</p>
        </div>


      </div>

      {/* Reviews */}
      <div className="p-10 bg-[#f7f7f7] col-span-2 flex items-center flex-wrap gap-10">
  {product?.reviews?.map((item, index) => (
    <div
      key={index}
      className="bg-white/80 p-5 border-[1px] border-amazonOrangeDark/50 rounded-md hover:border-amazonOrangeDark hover:bg-white duration-200 flex flex-col gap-1"
    >
      <p className="text-base font-semibold">{item?.comment}</p>
      
      <div className="text-xs">
        <p className="font-semibold">{item?.reviewerName}</p>
        <p>{item?.reviewerEmail}</p>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center">
          {Array?.from({ length: 5 })?.map((_, i) => (
            <MdStar
              key={i}
              className={
                i < item?.rating
                  ? "text-yellow-500"
                  : "text-lightText"
              }
            />
          ))}
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default SingleProduct;