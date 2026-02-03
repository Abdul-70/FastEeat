import React, { useState } from "react";
import { useEffect } from "react";
import { RESTAURANT_MENU_API, MENU_ITEM_IMG } from "../utils/Constants";
import { useParams } from "react-router-dom";
import { addItems } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import Shimmer from "./Shimmer";
// import RestaurantMenuShimmer from "./RestaurantMenuShimmer";
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

  if (resInfo === null) return <h1 className="text-center">{<Shimmer/>}</h1>;
  const { name, locality, costForTwoMessage,cuisines,totalRatingsString} = resInfo;
  // console.log(resInfo);
  
  return (
    <div className=" w-7/12 mx-auto my-4">
      <div>
          <h2 className="text-2xl font-bold my-2" key={resInfo.id}>
            {name }
          </h2>
         <div className="bg-white rounded-xl shadow-md border p-5 space-y-2">
  <h4 className="font-semibold text-lg">
    ⭐ {totalRatingsString} • {costForTwoMessage}
  </h4>

  <p className="text-sm font-medium text-amber-500">
    {cuisines.join(", ")}
  </p>

  <p className="text-sm text-gray-600 flex items-center gap-1">
    📍 <span>{locality}</span>
  </p>
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
  const [open , setOpen] =useState(title=== "Recommended")

  const handleClick = ()=>{
    if(title!=="Recommended"){
      return setOpen((prev)=> !prev);
    }
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div>
        <div className="relative cursor-pointer" >
           <h2 
        onClick={handleClick}
         className=" px-4 py-3 my-4 font-bold bg-gray-50 text-lg border-b rounded ">
          {title} ({itemCards?.length})
         {title!== "Recommended" && (<span className="absolute  right-0 pr-4"> {open ?  "▶" :"▼" }</span>)}</h2>
        </div>
       
        {open && (
           <ul className="list-disc">
          {itemCards?.map((item) => (
            <MenuItem key={item?.card?.info?.id} menuInfo={item?.card?.info} />
          ))}
        </ul>
        )}
       
      </div>
    </div>
  );
};

const NestedItemCategory = ({ data }) => {
  const { title, categories } = data ?? {};
  const [open , setOpen] =useState(false)

  return (
    <div className="bg-white shadow rounded-lg ">
      <div className="relative cursor-pointer">
        <h2 onClick={()=>setOpen(!open)} className="px-4 py-3 mt-4 font-bold cursor-pointer bg-gray-50 text-lg border-b">{title}
          <span className="absolute  right-0 pr-4"> {open ?  "▶" :"▼" }</span>
        </h2>
        
      </div>
      

      {open && (
         <div className="space-y-4 py-2 ">
        {categories?.map((sub) => (
          <div key={sub?.title}>
            <h3 className="font-semibold bg-gray-50 text-gray-800 px-3 ">
              {sub?.title} ({sub?.itemCards?.length})
            </h3>
            

            <div className="divide-y ">
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
      )}
     
    </div>
  );
};


 export const MenuItem = ({ menuInfo , showAddButton=true}) => {
  const { name, defaultPrice, price, description, imageId } = menuInfo ?? {};

  const dispatch =useDispatch()

  const handleAddItems= (item)=>{
    dispatch(addItems(item))
    console.log(item);
    
  }

  return (
    <div className="flex w-full justify-between border-b p-4">
      {/* Left */}
      <div className="w-8/12">
        <h3 className="font-semibold text-gray-800">{name}</h3>

        <p className="text-sm font-medium text-gray-700 mt-1">
          ₹{((defaultPrice ?? price ?? 0) / 100).toFixed(2)}
        </p>

        {description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {imageId && (
        <div className="relative ">
          <img
            className="h-28 w-28 rounded-lg object-cover"
            src={MENU_ITEM_IMG + imageId}
            alt={name}
          />
          {showAddButton &&(
            <button
           className=" absolute -bottom-3   -translate-x-1/2  p-2 rounded cursor-pointer
             font-semibold ml-14 mb-26  bg-white border shadow px-4 py-1
               text-green-600
           "
           onClick={()=>handleAddItems(menuInfo)}>Add+
           </button>
          )}
          
        </div>
        
        
      )}
    </div>
  );
};

export default RestaurantMenu;
