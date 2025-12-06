import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { CategoryItems } from "@/type";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CategoryListView = ({ categories }: CategoryItems) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-auto justify-between rounded-none rounded-tl-md rounded-bl-md text-black/80 capitalize border-r-2 hover:border-amazonOrangeDark hoverEffect`}
        >
          All
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command className="bg-amazonBlue backdrop-blur-md text-white">
          <CommandInput placeholder="Search Category" className="h-9" />
          <CommandList>
            <CommandEmpty>No  found.</CommandEmpty>
            <CommandGroup className="text-white">
              {categories?.map((category: string) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Link
                    href={`/category/${category}`}
                    className="flex items-center justify-between w-full px-2 py-1 capitalize font-medium"
                  >
                    {category}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === category ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryListView;
