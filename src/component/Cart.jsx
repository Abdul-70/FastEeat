import React from "react";
import { useSelector } from "react-redux";
import { MenuItem } from "./RestaurantMenu";
import { useDispatch } from "react-redux";
import { clearItems } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch()

    const handleClearItems= ()=>{
        dispatch(clearItems())
    }
  return (
    <div className="w-6/12 mx-auto py-6">
      <h1 className="font-bold text-2xl text-center mb-4">
        Cart ({cartItems.length})
      </h1>
      <button
      onClick={handleClearItems
      }
       className=" text-center my-2 bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600
             transition">Clear cart</button>

      {cartItems.length === 0 && (
        <p className="text-center text-gray-500">Cart is empty</p>
      )}

      <div className="bg-white rounded-lg shadow divide-y">
        {cartItems.map((item) => (
          <MenuItem key={item.id} menuInfo={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
