import React from "react"
const Header= ()=>{
    return(
        <div className="flex text-orange-400 bg-white shadow justify-between items-center">
            <div className="w-22 mx-10">
                <img  src="https://hungryforever.net/wp-content/uploads/2016/04/first-eat-logo.jpg" alt="logo" />
            </div>
            <div className="">
                <ul className="flex mx-5  ">
                    <li className=" px-10">Home</li>
                    <li className=" px-10">About Us </li>
                    <li className=" px-10">Contact Us</li>
                    <li className=" px-10">Cart</li>
                </ul>
            </div>

        </div>
    )
}

export default Header;