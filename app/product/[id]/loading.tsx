const Loading = () => {
  return (
    <main className="max-w-6xl mx-auto mt-8 p-4">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Left side - Image placeholder */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square bg-gray-300 rounded-lg animate-pulse"></div>
        </div>

        {/* Right side - Product details */}
        <div className="w-full md:w-1/2 space-y-4">
          {/* Title */}
          <div className="w-3/4 h-8 bg-gray-300 rounded animate-pulse"></div>

          {/* Rating */}
          <div className="w-1/4 h-6 bg-gray-300 rounded animate-pulse"></div>

          {/* Price */}
          <div className="w-1/3 h-10 bg-gray-300 rounded animate-pulse"></div>

          {/* Description */}
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Add to Cart button */}
          <div className="w-full h-12 bg-[#FFD814] rounded animate-pulse"></div>

          {/* Buy Now button */}
          <div className="w-full h-12 bg-[#FFA41C] rounded animate-pulse"></div>
        </div>
      </div>
    </main>
  );
};

export default Loading;