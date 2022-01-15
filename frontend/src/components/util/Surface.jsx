import React from "react";

const Surface = (props) => (
    <div className={"w-full bg-gradient-to-b from-sky-600/10 to-indigo-600/10 py-3 px-2 sm:p-3 md:p-4 md:py-5 rounded shadow " + props.className}>
        {props.children}
    </div>
)

export default Surface