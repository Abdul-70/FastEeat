import React from "react";
import Body from "./Body";
import { CDN_URL } from "../utils/Constants";
const RestaurantCard = ({data}) => {

  const {
    name,
    cloudinaryImageId,
    cuisines,
    costForTwo,
    avgRatingString,
    sla
  } = data.info

  return (
    <div className="shadow cursor-pointer hover:shadow-blue-400 rounded  w-55 m-5  ">
      <div className="flex justify-center">
        <img
          className="w-50 mt-2 rounded"
          src={CDN_URL+ cloudinaryImageId}
          alt=""
        />
      </div>
      <div className="mx-2">
        <h3 className="font-bold text-lg my-2 text-orange-400 ">{name}</h3>
        <p className=" text-sm text-gray-500"> {cuisines.join(", ")}</p>
        <p className="text-sm font-bold text-gray-500">{costForTwo}</p>
        <p className=" text-sm text-gray-500 ">{avgRatingString} Star</p>
        <p className="text-sm text-gray-500">{sla.deliveryTime} Minuts</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
