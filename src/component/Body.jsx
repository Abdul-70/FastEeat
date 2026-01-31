import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";


const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6139&lng=77.2090&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();

      const restaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setRestaurantList(restaurants);
      setFilteredRestaurantList(restaurants);
    } catch (error) {
      console.error("Failed to fetch restaurants", error);
    } finally {
      setLoading(false);
    }
  };

  /* 🔍 Search */
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = restaurantList.filter((res) =>
      res.info.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRestaurantList(filtered);
  };

  /* ⭐ Top Rated */
  const filterTopRated = () => {
    const topRated = restaurantList.filter(
      (res) => Number(res.info.avgRating) >= 4.5
    );
    setFilteredRestaurantList(topRated);
  };

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="h-60 w-52 bg-gray-200 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* 🔍 Search + Filter */}
      <div className="flex flex-wrap gap-4 justify-between items-center my-6">
        <div className="flex gap-2">
          <input
            className="border border-gray-300 px-3 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-orange-400"
            type="text"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <button
            className="bg-orange-500 text-white px-4 rounded-lg hover:bg-orange-600"
            onClick={() => handleSearch(searchText)}
          >
            Search
          </button>
        </div>

        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          onClick={filterTopRated}
        >
          ⭐ Top Rated
        </button>
      </div>

      {/* 🍽 Restaurant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredRestaurantList.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurantMenu/" + restaurant.info.id}
          >
            <RestaurantCard data={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
