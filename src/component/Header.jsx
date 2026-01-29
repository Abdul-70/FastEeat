import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header= ()=>{
    const [loginSignup, setLoginSignup] = useState("LogIn")

    // subscribing to the store using a selector
    const cartItem = useSelector((store)=> store.cart.items)
    // console.log(cartItem);
    

    return(
        <div className="flex text-orange-400 justify-between items-center sticky top-0 z-50 bg-white shadow-md">
            <div className="w-22 mx-10">
                <img  src="https://hungryforever.net/wp-content/uploads/2016/04/first-eat-logo.jpg" alt="logo" />
            </div>
            <div className="flex">
                <ul className="flex mx-5 font-semibold ">
                    <li className=" px-10"><Link to="/">Home</Link></li>
                    <li className=" px-10"><Link to="/about">About Us</Link> </li>
                    <li className=" px-10"><Link to="/contact">Contact Us</Link></li>
                    <li className=" px-10"><Link to="/cart">Cart ({cartItem.length})</Link></li>
                    
                </ul>
                <div className="mx-4">
                    <button
                    onClick={()=>{
                        if(loginSignup==="LogIn"){
                            return setLoginSignup("SignUp")
                        }
                        if(loginSignup!="LogIn") return setLoginSignup("LogIn")
                    }}
                    className="bg-amber-400  text-white cursor-pointer px-2 py-1 rounded">
                        {loginSignup}
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Header;