import classNames from "classnames"
import React from "react"

const Button = ({
    children,
    variant,
    ...props
}) => (
    <button
        className={classNames({
            "font-medium text-slate-800 bg-orange-500 disabled:bg-orange-500/60 shadow hover:shadow-xl shadow-orange-500/50 disabled:shadow-none px-4 py-1 rounded-lg transition ease-in duration-150 hover:scale-105 disabled:scale-100": variant === "primary" || variant === undefined,
            "font text-orange-400 border-2 border-orange-500 disabled:border-orange-500/60 hover:bg-orange-500 disabled:bg-transparent hover:text-slate-800 disabled:text-orange-400/60 hover:shadow-lg px-4 py-1 rounded-lg transition-transform duration-150 hover:scale-105 disabled:scale-100": variant === "secondary"
        })}
        {...props}
    >
        <div className="flex items-center justify-center gap-1">
            {children}
        </div>
    </button>
)

export default Button