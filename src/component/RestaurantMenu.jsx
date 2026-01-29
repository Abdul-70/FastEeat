import React, { useState } from "react";
import { useEffect } from "react";
import { RESTAURANT_MENU_API, MENU_ITEM_IMG } from "../utils/Constants";
import { useParams } from "react-router-dom";
import { addItems } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
// import appStore from "../utils/appStore";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [resMenu, setResMenu] = useState(null);
  const { resId } = useParams();

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
        const title = item?.card?.card?.title;
        const type = item?.card?.card["@type"];
        const itemCards = item?.card?.card?.itemCards || [];
        const categories = item?.card?.card?.categories || [];

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
  const { name, locality, costForTwoMessage,cuisines,totalRatingsString} = resInfo;
  // console.log(resInfo);
  
  return (
    <div className=" w-7/12 mx-auto my-4">
      <div>
        <h2 className="text-2xl font-bold my-2" key={resInfo.id}>
          {name }
        </h2>
        <div className="bg-white rounded-lg shadow-lg  shadow-amber-300 p-5">
            <h4 className="my-2 font-bold">⭐ {totalRatingsString +" - "+costForTwoMessage}
            </h4>
            <p className="underline-offset-1 my-2 font-bold text-amber-500">{cuisines.join(", ")}</p>
            <p className="my-2 text-sm font-bold">📍{locality}</p>
        </div>

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
    <div className="bg-white shadow rounded-lg">
      <div>
        <h2 className=" px-4 py-3 my-4 font-bold bg-gray-300 text-lg border-b rounded ">
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
      <h2 className="px-4 py-3 my-4 font-bold bg-gray-300 text-lg border-b">{title}</h2>

      <div className="space-y-4 py-2">
        {categories?.map((sub) => (
          <div key={sub?.title}>
            <h3 className="font-semibold bg-gray-200 text-black px-2 ">
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


 export const MenuItem = ({ menuInfo }) => {
  const { name, defaultPrice, price, description, imageId } = menuInfo ?? {};

  const dispatch =useDispatch()

  const handleAddItems= (item)=>{
    dispatch(addItems(item))
    console.log(item);
    
  }

  return (
    <div className="flex justify-between p-4">
      <div className="w-9/12">
        <h3 className="font-semibold text-gray-800">{name}</h3>

        <p className="text-sm font-medium text-gray-700 mt-1">
          ₹{((defaultPrice ?? price ?? 0) / 100)?.toFixed(2)}
        </p>

        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {imageId && (
        <div className="">
          <img
          className="h-28 w-28 rounded-lg object-cover"
          src={MENU_ITEM_IMG + imageId}
          alt={name}
        />
          <button
           className=" p-2 rounded cursor-pointer bg-black
            text-white font-semibold ml-6 mb-4 
           "
           onClick={()=>handleAddItems(menuInfo)}>Add+
           </button>
        </div>
        
        
      )}
    </div>
  );
};

export default RestaurantMenu;
