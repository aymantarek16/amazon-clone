import {
  bannerFive,
  bannerFour,
  bannerOne,
  bannerThree,
  bannerTwo,
} from "@/assets";
import ProductsList from "@/components/ProductsList";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { fetchData } from "@/hooks/fetchdata";

export default async function Home() {
  const bannerImages = [
    { title: "bannerOne", source: bannerOne },
    { title: "bannerTwo", source: bannerTwo },
    { title: "bannerThree", source: bannerThree },
    { title: "bannerFour", source: bannerFour },
    { title: "bannerFive", source: bannerFive },
  ];

  const endpoint = "https://dummyjson.com/products";
  const { products } = await fetchData(endpoint);

  return (
    <div>
      <Carousel>
        <CarouselContent>
          {bannerImages?.map((item) => (
            <CarouselItem key={item?.title}>
              <Image
                src={item?.source}
                alt="bannerOne"
                className="w-full"
                height={1080}
                priority
              />
              <div className="">
                <p>
                  { }
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="-mt-10 md:-mt-20 lg:-mt-40 flex items-center justify-center pb-10">
        <ProductsList products={products} />
      </div>
    </div>
  );
}
