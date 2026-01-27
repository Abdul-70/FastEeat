import React from "react";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import RestaurantMenu from "./RestaurantMenu";



const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=26.868394&lng=80.931418&carousel=true&third_party_vendor=1"
      );
      const json = await data.json();
      console.log(json);
      
      const restaurents =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      setRestaurantList(restaurents);
      setFilteredRestaurantList(restaurents);


    };
    fetchData();
  }, []);

  
  

  return (
    <div>
      <div className="mx-2 my-2 justify-between flex">
        <div>
          <input
            className="border border-gray-400 w-85 p-1 "
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              console.log(searchText);
            }}
          />
          <button
            className="border p-2  bg-amber-400 cursor-pointer rounded text-white"
            onClick={() => {
              const filteredList = restaurantList.filter((e) => {
                return e.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setFilteredRestaurantList(filteredList);
              console.log("filteredList : " + filteredRestaurantList);
            }}
          >
            Search
          </button>
        </div>

        <button className="border p-2 bg-amber-400 cursor-pointer rounded text-white" onClick={()=>{
            const topRes = restaurantList.filter((res)=> 
            res.info.avgRatingString >= 4.5)

            setFilteredRestaurantList(topRes)
        }}>
          
          Top Rated Restaurents
        </button>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurantList.map((restaurant) => (
          <Link key={restaurant.info.id} to={"/restaurantMenu/"+restaurant.info.id}><RestaurantCard  data={restaurant} /></Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
