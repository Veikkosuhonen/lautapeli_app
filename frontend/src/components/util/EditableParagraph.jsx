import React, { useState } from "react"

const EditableParagraph = ({
    value, setValue, className, ...props
}) => {

    const [rows, setRows] = useState(1)

    const lineHeight = 28
    const minRows = 1
    const maxRows = 16

    // https://codepen.io/liborgabrhel/pen/eyzwOx?editors=0010
    const handleChange = (event) => {
		const previousRows = event.target.rows;
        event.target.rows = minRows; // reset number of rows in textarea 
            
        const currentRows = ~~(event.target.scrollHeight / lineHeight);
        
        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }
            
        if (currentRows >= maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
        }
        
        setValue( event.target.value)
        setRows(currentRows < maxRows ? currentRows : maxRows)
	}

    return (
        <textarea
            rows={rows}
            value={value}
            onChange={handleChange}
            className={"bg-transparent outline-1 outline-dashed outline-indigo-500 focus:outline-2 p-2 rounded disabled:outline-none " +
                "text-slate-300 text-base sm:text-lg line resize-none placeholder:text-slate-400 " + className}
            disabled={props.disabled}
            placeholder={props.placeholder}
            id={props.id}
        />
    )
}

export default EditableParagraph