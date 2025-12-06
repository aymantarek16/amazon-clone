import { useState } from "react";
import Title from "./Tilte";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

interface Props {
  categories: string[];
  setSelectedCategory: (category: string) => void;
  selectedCategory: string;
  setPriceFilter: (value: string) => void;
  priceFilter: string;
  setPriceValue: (value: number) => void;
  priceValue: number;
  defaultPrice: number;
  maxPrice: number;
}

const ProductFilters = ({
  categories,
  setSelectedCategory,
  selectedCategory,
  setPriceFilter,
  priceFilter,
  setPriceValue,
  priceValue,
  defaultPrice,
  maxPrice,
}: Props) => {
  const [categoriesArray, setCategoriesArray] = useState(
    categories.slice(0, 8)
  );

  return (
    <div className="space-y-4">
      <Title className="text-lg">Filters</Title>

      <div>
        <h4 className="font-medium mb-2">Category</h4>
      </div>

      <div className="space-y-2">
        {categoriesArray?.map((item) => (
          <div
            key={item}
            className="flex items-center cursor-pointer hover:text-amazonOrangeDark transition-colors"
          >
            <Checkbox
              id={`category-${item}`}
              checked={selectedCategory === item}
              onCheckedChange={() => setSelectedCategory(item)}
            />

            <Label
              htmlFor={`category-${item}`}
              className="ml-3 text-sm md:text-base font-medium cursor-pointer select-none capitalize"
            >
              {item}
            </Label>
          </div>
        ))}

        {categoriesArray?.length > 8 ? (
          <button
            onClick={() => setCategoriesArray(categories.slice(0, 8))}
            className="
      group text-xs font-semibold text-amazonBlue relative px-1
      transition-all duration-200 ease-out
      hover:text-amazonOrangeDark
      active:scale-95
    "
          >
            Minimizes categories

            {/* animated underline */}
            <span
              className="
        absolute left-0 -bottom-0.5 h-[2px] w-full bg-amazonBlue 
        scale-x-100 transition-transform duration-300 group-hover:scale-x-0
      "
            />
            <span
              className="
        absolute left-0 -bottom-0.5 h-[2px] w-full bg-amazonOrangeDark 
        scale-x-0 transition-transform duration-300 group-hover:scale-x-100
      "
            />
          </button>
        ) : (
          <button
            onClick={() => setCategoriesArray(categories)}
            className="
      group text-xs font-semibold text-amazonBlue relative px-1
      transition-all duration-200 ease-out
      hover:text-amazonOrangeDark
      active:scale-95
    "
          >
            Show all categories

            {/* animated underline */}
            <span
              className="
        absolute left-0 -bottom-0.5 h-[2px] w-full bg-amazonBlue 
        scale-x-100 transition-transform duration-300 group-hover:scale-x-0
      "
            />
            <span
              className="
        absolute left-0 -bottom-0.5 h-[2px] w-full bg-amazonOrangeDark 
        scale-x-0 transition-transform duration-300 group-hover:scale-x-100
      "
            />
          </button>
        )}
      </div>



      {/* Price Range Section */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>

        {/* Sort by Price (High to Low / Low to High) */}
        <div className="space-y-2 mb-5">
          {[
            {value: "desc", title: "High to Low" },
            {value: "asc", title: "Low to High" },
          ].map((item) => (
            <div
              key={item?.title}
              className="flex items-center cursor-pointer hover:text-amazonOrangeDark transition-colors"
            >
              <Checkbox
                id={`price-${item.value}`}
                checked={priceFilter === item.value}
                onCheckedChange={() => setPriceFilter(item.value)}
              />
              <Label
                htmlFor={`price-${item.value}`}
                className="ml-2 text-sm font-medium cursor-pointer"
              >
                {item.title}
              </Label>
            </div>
          ))}
        </div>

        {/* Price Slider */}
        <div className="mt-5">
          <Slider
            defaultValue={[defaultPrice]}
            max={maxPrice}
            step={1}
            onValueChange={(e) => setPriceValue(e[0])}
            className="cursor-pointer"
          />
          {priceValue > 0 && (
            <p className="mt-3 text-xs text-gray-600">
              Filter price:{" "}
              <span className="font-bold text-amazonOrangeDark">{defaultPrice}</span> to{" "}
              <span className="font-bold text-amazonOrangeDark">{priceValue}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
