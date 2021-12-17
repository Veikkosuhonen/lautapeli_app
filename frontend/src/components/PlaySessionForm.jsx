import React from "react";

const PlaySessionForm = ({onChange, playsession, onSubmit}) => (
    <div>
        <form onSubmit={(event) => {event.preventDefault(); onSubmit()}}>
                <input value={playsession.duration} onChange={onChange}/>
                <button type="submit">add</button>
            </form>
    </div>
)

export default PlaySessionForm