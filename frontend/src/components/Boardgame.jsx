import React from 'react'

const Boardgame = ({ id, name }) => {
    return (
        <li key={id}>{name}</li>
    )
}

export default Boardgame