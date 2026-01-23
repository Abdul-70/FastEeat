import { useRouteError } from "react-router-dom";
import React from "react";

const Error = ()=>{
    const err = useRouteError()
    return(
        <div>
            <h1 className="content-center justify-center flex font-bold text-2xl text-blue-500">Opps.... | {err.status +" : "+ err.statusText}</h1>
            <h2 className="content-center justify-center flex font-bold text-2xl text-blue-500"
            >Something went wrong.</h2>
        </div>
    )
}

export default Error;