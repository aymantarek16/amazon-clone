/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Product } from "@/type";
import { useEffect, useRef, useState } from "react";
import Title from "./Tilte";
import { Card, CardContent } from "./ui/card";
import ProductFilters from "./ProductFilters";
import { fetchData } from "@/hooks/fetchdata";
import ProductCard from "./ProductCart";
import { Loader2 } from "lucide-react";

const AllProducts = ({ categories }: { categories: string[] }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState("");
  const [priceValue, setPriceValue] = useState(0);

  const maxPrice = 40000;
  const defaultPrice = 0;
  const perPage = 12;

  const observerRef = useRef<HTMLDivElement | null>(null);


  const loadMoreProducts = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);

    const categoryFilter = selectedCategory
      ? `/category/${selectedCategory}`
      : "";

    const filterPrice = priceFilter
      ? `sortBy=price&order=${priceFilter}`
      : "";

    const endpoint = `https://dummyjson.com/products${categoryFilter}?${filterPrice}&limit=${perPage}&skip=${reset ? 0 : (currentPage - 1) * perPage
      }`;
    try {
      const data = await fetchData(endpoint);

      if (reset) {
        setProducts(data?.products || []);
        setHasMore(data?.products?.length > 0);
        setCurrentPage(1);
      } else if (data?.products?.length > 0) {
        setProducts((prev) => [...prev, ...data?.products]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreProducts();
  }, [currentPage]);

  useEffect(() => {
    loadMoreProducts(true);
  }, [selectedCategory, priceFilter]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore]);

  return (
    <>
      <div className="p-5 lg:p-10">
        <Title className="text-4xl font-bold text-center mb-5">
          Discover Our Exquisite Collection
        </Title>

        <Card className="mb-8">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-4">
            <div className="flex flex-col items-start mb-6 w-auto md:min-w-40 self-start">
              <ProductFilters
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                priceValue={priceValue}
                setPriceValue={setPriceValue}
                defaultPrice={defaultPrice}
                maxPrice={maxPrice}
              />
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products?.map((product, index) => (
                  <ProductCard key={index.toString()} product={product} />
                ))}
              </div>

              <div ref={observerRef}>
                {!loading && (
                  <div className="w-full flex items-center justify-center mt-10 py-10 bg-amazonBlue/5">
                    <Loader2 className="w-10 h-10 text-amazonOrangeDark animate-spin" />
                  </div>
                )}
              </div>
            </div>
          </CardContent>


        </Card>
      </div>
    </>
  );
};

export default AllProducts;