import { Product } from "@/type";
import React from "react";
import ProductCard from "@/components/ProductCart";
import Container from "./Container";
import { cn } from "@/lib/utils";

interface Props {
  products: Product[];
  className?: string;
}

const ProductsList = ({ products, className }: Props) => {
  return (
    <Container
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5",
        className
      )}
    >
      {products?.map((product) => (
        <ProductCard key={product?.id} product={product} />
      ))}
    </Container>
  );
};
export default ProductsList;