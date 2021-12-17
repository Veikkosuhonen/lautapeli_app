import React from 'react'

const Boardgame = ({ id, name, onSelect }) => (
    <li>
        {name}
        <button onClick={() => onSelect(id)}>Select</button>
    </li>
)

export default Boardgame