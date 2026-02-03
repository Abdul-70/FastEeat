import React from "react";
import { useSelector } from "react-redux";
import { MenuItem } from "./RestaurantMenu";
import { useDispatch } from "react-redux";
import { clearItems, removeItems } from "../utils/cartSlice";
import { useMemo } from "react";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const itemTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.price ?? item.defaultPrice ?? 0;
      return total + price / 100;
    }, 0);
  }, [cartItems]);

  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const gst = itemTotal * 0.05; // 5% GST
  const grandTotal = itemTotal + deliveryFee + gst;

  const handleClearItems = () => {
    dispatch(clearItems());
  };
  const handleDeleteItems = (id) => {
    dispatch(removeItems(id));
  };
  return (
    <div>
      <div className="w-6/12 mx-auto py-6">
        <h1 className="font-bold text-2xl text-center mb-4">
          Cart ({cartItems.length})
        </h1>
        <button
          onClick={handleClearItems}
          className=" text-center my-2 bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600
              transition"
        >
          Clear cart
        </button>

        {cartItems.length === 0 && (
          <p className="text-center text-gray-500">Cart is empty</p>
        )}

        <div className="bg-white rounded-lg shadow divide-y">
          {cartItems.map((item) => (
            <div key={item.id} className="flex">
              <MenuItem key={item.id} menuInfo={item} showAddButton={false} />

              <div className="text-center p-2 ">
                <button
                  // onClick={() => dispatch(addItems(item))}
                  className="px-2 py-1 my-4 font-bold bg-green-500 text-white rounded"
                >
                  +
                </button>
                <button
                  onClick={() => handleDeleteItems(item.id)}
                  className=" px-2 py-1 my-4 bg-red-500 font-bold text-white rounded"
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {cartItems.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4 mt-6">
            <h2 className="font-bold text-lg mb-3">Bill Details</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Item Total</span>
              <span>₹{itemTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>GST (5%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-bold text-base">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>

            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Proceed to Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
