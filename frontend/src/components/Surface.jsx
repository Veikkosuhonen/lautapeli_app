import React from "react";

const Surface = (props) => (
    <div className={"w-full bg-slate-800 py-2 pl-1 sm:p-2 md:p-4 rounded-sm shadow " + props.className}>
        {props.children}
    </div>
)

export default Surface