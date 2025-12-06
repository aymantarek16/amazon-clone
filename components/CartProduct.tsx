import { store } from "@/lib/store";
import { Product } from "@/type";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import PriceFormat from "./PriceFormat";
import AddToCartBtn from "./AddToCartBtn";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CartProduct = ({ product }: { product: Product }) => {
  const { removeFromCart } = store();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative flex gap-6 p-6 border-b border-gray-300 bg-white rounded-2xl shadow-sm hover:shadow-xl duration-300"
    >
      {/* PRODUCT IMAGE */}
      <Link
        href={`/product/${product?.id}`}
        className="h-28 w-28 sm:h-40 sm:w-40 border border-gray-200 hover:border-black duration-200 hover:shadow-md flex items-center justify-center rounded-2xl overflow-hidden group bg-white"
      >
        <Image
          src={product?.images[0]}
          alt={product?.title}
          width={300}
          height={300}
          className="h-[90%] w-[90%] object-contain group-hover:scale-110 duration-300"
        />
      </Link>

      {/* INFORMATION COLUMN */}
      <div className="flex flex-col flex-1 gap-2">
        {/* HEADER ROW */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold leading-tight line-clamp-2 max-w-[80%]">
            {product?.title}
          </h3>
        </div>

        {/* BRAND + CATEGORY */}
        <div className="text-xs space-y-1 text-gray-600">
          <p>
            Brand: <span className="font-medium text-black">{product?.brand}</span>
          </p>
          <p>
            Category: <span className="font-medium text-black">{product?.category}</span>
          </p>
        </div>

        {/* PRICE + QUANTITY */}
        <div className="flex items-center gap-6 mt-1">
          <PriceFormat
            amount={product?.price * (product?.quantity || 1)}
            className="text-lg font-bold text-black"
          />

          <div className="relative top-1">
            <AddToCartBtn product={product} showSubtotal={false} />
          </div>
        </div>

        {/* SAVINGS */}
        {product?.quantity && product?.discountPercentage > 0 && (
          <div className="mt-1 px-3 py-1.5 rounded-xl bg-green-50 border border-green-200 w-fit shadow-sm">
            <p className="text-sm font-semibold text-green-700 flex items-center gap-1">
              <span className="text-green-800 tracking-tight">You save</span>
              <span className="font-bold text-green-900">
                <PriceFormat
                  amount={
                    (product.price * (product.discountPercentage / 100)) *
                    product.quantity
                  }
                />
              </span>
            </p>
          </div>
        )}
      </div>

      {/* REMOVE BUTTON */}
      <button
        onClick={() => {
          removeFromCart(product?.id);
          toast.success(`${product?.title.substring(0, 20)} removed successfully`);
        }}
        className="absolute right-4 top-4 text-gray-600 hover:text-red-600 hoverEffect p-1 flex items-center gap-1 text-sm rounded-full"
      >
        <IoClose className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default CartProduct;
