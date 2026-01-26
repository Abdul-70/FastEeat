import React, { useState } from "react";
import { useEffect } from "react";
import { RESTAURANT_MENU_API, MENU_ITEM_IMG } from "../utils/Constants";

import { useParams } from "react-router-dom";
// import ItemsCard from "./ItemsCard";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState(null);
  const [resMenu, setResMenu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(RESTAURANT_MENU_API);
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
    <div className=" w-8/12 flex items-center ">
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
        <h2 className="border font-bold py-4">
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

const NestedItemCategory = (props) => {
  console.log(props);

  const { title, categories } = props?.data ?? {};

  return (
    <div>
      <div>
        <h2 className="border font-bold py-4">{title} </h2>
        <div>
          {categories?.map((subCategory) => (
            <div key={subCategory?.title}>
              <h3 className="font-bold">
                {subCategory?.title} ({subCategory?.itemCards?.length}){" "}
              </h3>

              <ul>
                {subCategory?.itemCards?.map((item) => (
                  <MenuItem
                    key={item?.card?.info?.id}
                    menuInfo={item?.card?.info}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {props?.category?.title}
    </div>
  );
};

const MenuItem = (props) => {
  // console.log(props?.data);
  const { name, defaultPrice, description, imageId, price } =
    props?.menuInfo ?? {};
  return (
    <div className="flex justify-between ">
      <div className="">
        <li>
          <h3 className="font-bold  text-gray-500">{name}</h3>
          {defaultPrice && <span>-₹{(defaultPrice / 100)?.toFixed(2)}</span>}
          {price && <span>-₹{(price / 100)?.toFixed(2)}</span>}
          <br />
          {description && <span>{description}</span>}
        </li>
      </div>

      <div className="h-40 w-40">
        {imageId && (
          <img
            className="h-full w-full object-fill"
            src={MENU_ITEM_IMG + imageId}
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
