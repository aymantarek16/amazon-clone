"use client";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { CategoryItems, Product } from "@/type";
import CategoryListView from "./CategoryListView";
import { fetchData } from "@/hooks/fetchdata";

const SearchInput = ({ categories }: CategoryItems) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false); // New state to manage input focus
  const searchContainerRef = useRef<HTMLDivElement>(null); // Ref to detect clicks outside




  useEffect(() => {
    const getData = async () => {
      const endpoint = `https://dummyjson.com/products/search?q=${searchQuery}`;
      try {
        const data = await fetchData(endpoint);
        setProducts(data?.products);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    getData();
  }, [searchQuery]);


  // Effect to detect click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false); // Hide the list if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchContainerRef}
      className="flex-1 h-10 mx-4 hidden md:inline-flex items-center justify-between relative"
    >
      <CategoryListView
        categories={categories}
      />
      <input
        id="search"
        name="search"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search amazon"
        onFocus={() => setIsInputFocused(true)}
        autoComplete="search"
        className="w-full h-full rounded-tr-md rounded-br-md px-2 placeholder:text-sm text-base text-black placeholder:text-black/70 border-[3px] border-transparent outline-none focus-visible:border-amazonOrange"
      />

      {searchQuery && (
        <MdOutlineClose
          onClick={() => setSearchQuery("")}
          className="text-xl text-amazonLight hover:text-red-600 absolute right-14 duration-200 cursor-pointer"
        />
      )}
      <span className="w-12 h-full bg-amazonOrange hover:bg-amazonOrangeDark duration-200 cursor-pointer text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
        <HiOutlineSearch />
      </span>
      {/*  ============= Searchfield start here ========== */}
      {isInputFocused && searchQuery && (
        <div className="absolute left-0 top-12 w-full mx-auto h-auto max-h-96 bg-white rounded-md overflow-y-scroll cursor-pointer text-black">
          {products?.length > 0 ? (
            <div className="flex flex-col">
              {products?.map((item: Product) => (
                <Link
                  key={item?.id}
                  href={{
                    pathname: `/product/${item?.id}`,
                    query: { id: item?.id },
                  }}
                  onClick={() => setSearchQuery("")}
                  className="flex items-center gap-x-2 text-base font-medium hover:bg-lightText/30 px-3 py-1.5"
                >
                  <CiSearch className="text-lg" /> {item?.title}
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-10 px-5">
              <p className="text-base">
                Nothing matched with{" "}
                <span className="font-semibold underline underline-offset-2 decoration-[1px]">
                  {searchQuery}
                </span>{" "}
                Please try again.
              </p>
            </div>
          )}
        </div>
      )}

      {/*  ============= Searchfield end here ============ */}
    </div>
  );
};

export default SearchInput;
