import React from "react";

const Background = (props) => (
    <div className="
    w-full h-full fixed
    backdrop-blur
    backdrop-brightness-75
    ">
        {props.children}
    </div>
)

export default Background