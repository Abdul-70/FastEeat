import React, { useState } from "react";
import { useEffect } from "react";
import { RESTAURANT_MENU_API, MENU_ITEM_IMG } from "../utils/Constants";

import { useParams } from "react-router-dom";
// import ItemsCard from "./ItemsCard";

const RestaurantMenu = () => {
  
  const [resInfo, setResInfo] = useState(null);
  const [resMenu, setResMenu] = useState(null);
  const {resId} =useParams()
  console.log(resId);
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(RESTAURANT_MENU_API + resId);
      const json = await data.json();

      const menuData = json?.data?.cards
        ?.find((gCard) => gCard?.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (item) =>
            item?.card?.card["@type"]?.includes("ItemCategory") ||
            item?.card?.card["@type"]?.includes("NestedItemCategory"),
        );

      const organisedMenuData = menuData.map((item) => {
        // console.log(item);

        const title = item?.card?.card?.title;
        const type = item?.card?.card["@type"];
        const itemCards = item?.card?.card?.itemCards || [];
        const categories = item?.card?.card?.categories || [];

        //    console.log(itemCards);
        //    console.log(categories);
        if (type?.includes("NestedItemCategory")) {
          return {
            title,
            type: "nested",
            categories: categories?.map((category) => {
              return {
                title: category?.title,
                itemCards: category?.itemCards,
              };
            }),
          };
        } else {
          return {
            title,
            type: "item",
            itemCards,
          };
        }
      });

      setResInfo(
        json?.data?.cards?.find((item) =>
          item?.card?.card["@type"]?.includes("food.v2.Restaurant"),
        )?.card?.card?.info,
      );

      setResMenu(organisedMenuData);
    };

    fetchData();
  }, []);

  if (resInfo === null) return <h1>Shimmer</h1>;
  //   console.log(resInfo);
  // console.log(resMenu);

  const { name, locality } = resInfo;

  return (
    <div className=" w-7/12 mx-auto my-4">
      <div>
        <h1 className="text-2xl font-bold my-2" key={resInfo.id}>
          Restaurant - {name + "| ID: " + resId}
        </h1>
        <h3>{locality}</h3>

        <div>
          {/* Menu ItemsCard */}
          {resMenu?.map((category) =>
            category?.type === "item" ? (
              <ItemCategory key={category?.title} data={category} />
            ) : (
              <NestedItemCategory key={category?.title} data={category} />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

const ItemCategory = (props) => {
  //   console.log(props);

  const { title, itemCards } = props?.data ?? {};

  return (
    <div className=" my-2">
      <div>
        <h2 className=" font-bold py-4 shadow rounded-lg ">
          {title} ({itemCards?.length})
        </h2>
        <ul className="list-disc">
          {itemCards?.map((item) => (
            <MenuItem key={item?.card?.info?.id} menuInfo={item?.card?.info} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const NestedItemCategory = ({ data }) => {
  const { title, categories } = data ?? {};

  return (
    <div className="bg-white shadow rounded-lg">
      <h2 className="px-4 py-3 font-bold text-lg border-b">{title}</h2>

      <div className="space-y-4 p-4">
        {categories?.map((sub) => (
          <div key={sub?.title}>
            <h3 className="font-semibold text-black mb-2">
              {sub?.title} ({sub?.itemCards?.length})
            </h3>

            <div className="divide-y">
              {sub?.itemCards?.map((item) => (
                <MenuItem
                  key={item?.card?.info?.id}
                  menuInfo={item?.card?.info}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const MenuItem = ({ menuInfo }) => {
  const { name, defaultPrice, price, description, imageId } = menuInfo ?? {};

  return (
    <div className="flex justify-between p-4">
      <div className="w-9/12">
        <h3 className="font-semibold text-gray-800">{name}</h3>

        <p className="text-sm font-medium text-gray-700 mt-1">
          ₹{((defaultPrice || price) / 100)?.toFixed(2)}
        </p>

        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {imageId && (
        <img
          className="h-28 w-28 rounded-lg object-cover"
          src={MENU_ITEM_IMG + imageId}
          alt={name}
        />
      )}
    </div>
  );
};


export default RestaurantMenu;
