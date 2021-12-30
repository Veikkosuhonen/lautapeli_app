import React from "react";

const Surface = (props) => (
    <div className="
    w-full sm:w-auto
    bg-slate-800 p-2 rounded border border-slate-700">
        {props.children}
    </div>
)

export default Surface