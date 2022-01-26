import { Listbox, Transition } from "@headlessui/react"

const SelectInput = ({ value, setValue, options }) => {
    return (
        <div className="text-slate-300">
            <Listbox value={value} onChange={setValue}>
                <Listbox.Button className="py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700">
                    {value}
                </Listbox.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                ></Transition>
                <Listbox.Options className="absolute z-20 mt-1 bg-slate-800 shadow-lg rounded border border-slate-700">
                    {options.map((option, idx) => (
                    <Listbox.Option
                        className={"hover:bg-slate-700 hover:text-slate-200 select-none cursor-default p-2 " + (option === value ? "text-indigo-400" : "text-slate-400")}
                        key={idx}
                        value={option}
                    >
                        {option}
                    </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

export default SelectInput