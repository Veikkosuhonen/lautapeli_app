import React from "react";

const PlaySession = ({ id, date, duration }) => (
    <li key={id}>
        {date}, {duration} minutes
    </li>
)

export default PlaySession