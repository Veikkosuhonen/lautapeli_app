import { useState, useRef } from "react"
import styles from "../../util/styles"
import { AiOutlineEnter } from "react-icons/ai"

const PlayerSelector = ({ 
    users,
    players,
    handleSelect
 }) => {

    const [searchTerm, setSearchTerm] = useState("")   
    const [isOpen, setIsOpen] = useState(false)
    const [focusIndex, setFocusedIndex] = useState(0)
    
    const searchFieldRef = useRef(null)

    let options = users
        .filter(user => user.name.toLowerCase().includes(searchTerm))
        .filter(user => !players.some(p => p.id === user.id))

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if (focusIndex === options.length - 1) {
                setFocusedIndex(focusIndex - 1)
            }
            return
        }
        if (event.key === "ArrowUp") {
            event.preventDefault()
            return setFocusedIndex(Math.max(0, focusIndex - 1))
        }
        if (event.key === "ArrowDown") {
            event.preventDefault()
            return setFocusedIndex(Math.min(options.length - 1, focusIndex + 1))
        }  
    }

    const handleBlur = (event) => {
        if (event.currentTarget.contains(event.relatedTarget)) {
            // clicked an element in the dropdown, lets focus back to search
            searchFieldRef.current.focus()
        } else {
            // clicked outside
            setIsOpen(false)
        }
    }
    
    return (
        <div className="relative" onBlur={handleBlur}>
            <input type="search" 
                ref={searchFieldRef}
                className={styles.inputField}
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value.toLowerCase())}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder="player name"
            />
            {isOpen && 
            <div className="absolute flex flex-col mt-2 divide-y divide-slate-600 bg-slate-700 rounded shadow-md text-slate-400 text-serif w-64 md:w-96" >
                {options.map((option, index) => 
                    <button 
                        key={option.id} 
                        onClick={() => handleSelect(option) }
                        className="p-1 text-left hover:bg-slate-600"
                    >
                        <div className="flex flex-row items-center">
                            <span className={"mr-auto p-1 " + (index === focusIndex ? "text-slate-200" : "")}>{option.name}</span>
                            {index === focusIndex && 
                            <div className="flex flex-row items-center p-1 rounded bg-slate-800/50 font-mono text-sm">
                                <span>enter</span>
                                <AiOutlineEnter className="w-4 h-4"/>
                            </div>}
                        </div>
                    </button>
                )}
                {options.length === 0 && <span className="p-2">No users</span>}
            </div>}
        </div>
    )
}

export default PlayerSelector