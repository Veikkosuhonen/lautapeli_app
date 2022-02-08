import React from "react";

const Surface = (props) => (
    <div className={"w-full bg-gradient-to-b from-sky-700/20 to-indigo-700/20 py-3 px-2 sm:p-3 md:p-4 md:py-5 rounded shadow " + props.className}>
        {props.children}
    </div>
)

export default Surface