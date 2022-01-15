import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Button = forwardRef(({ value, onClick }, ref) => (
    <button 
        className="
        p-1 w-full rounded bg-slate-700/50
        focus:outline-none focus:outline-indigo-400 hover:outline-dashed hover:outline-indigo-600 outline-2 outline-offset-2
        font-serif text-slate-400"
        onClick={onClick} ref={ref}
        type="button" // somehow this defaulted to "submit" and caused issues
    >
        {value}
    </button>
))

const DateInput = ({
    date, setDate
}) => {

    return (
        <div>
            <ReactDatePicker 
                placeholderText="Date"
                selected={date}
                onChange={(date) => { setDate(date) }}
                customInput={<Button />}
                showTimeSelect
                dateFormat="dd/MM/yyyy hh:mm"
            />
        </div>
    )
}
export default DateInput