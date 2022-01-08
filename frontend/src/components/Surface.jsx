import React from "react";

const Surface = (props) => (
    <div className={"w-full bg-slate-800 p-2 shadow " + props.className}>
        {props.children}
    </div>
)

export default Surface