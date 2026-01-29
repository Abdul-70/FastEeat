import React from "react";

const RestaurantMenuShimmer = () => {
  return (
    <div className="w-7/12 mx-auto my-6 animate-pulse">

      {/* Restaurant Header Shimmer */}
      <div className="bg-gray-200 rounded-xl h-32 mb-6"></div>

      {/* Categories Shimmer */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="mb-6">

          {/* Category Title */}
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>

          {/* Menu Items */}
          {[...Array(3)].map((_, j) => (
            <div
              key={j}
              className="flex justify-between items-center mb-4"
            >
              {/* Text */}
              <div className="space-y-2 w-8/12">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>

              {/* Image */}
              <div className="h-24 w-24 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenuShimmer;
