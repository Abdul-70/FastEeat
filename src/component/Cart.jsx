import React from "react";
import { useSelector } from "react-redux";
import { MenuItem } from "./RestaurantMenu";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="w-6/12 mx-auto py-6">
      <h1 className="font-bold text-2xl text-center mb-4">
        Cart ({cartItems.length})
      </h1>

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
