import React from "react";
import About from "./component/About";
import Contact from "./component/Contact";
import "./App.css";
import RestaurantMenu from "./component/RestaurantMenu";
import Header from "./component/Header";
import Body from "./component/Body";
import Error from "./component/Error";
import { createBrowserRouter, Outlet } from "react-router-dom";
function App() {
  return (
    <div>
      <Header />
      <Outlet/>
    </div>
  );
}

export const AppRouter = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    errorElement : <Error/>,
    children :[
      {index : true, element: <Body/>},
      {path : "/about", element : <About/>},
      {path : "/contact", element : <Contact/>},
      {path : "/restaurantMenu/:resId", element : <RestaurantMenu/>}
    ]
  }
])

export default App;

