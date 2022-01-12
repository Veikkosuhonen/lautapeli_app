import Activities from "./Activities"

export default function ContentLayout(props) {
    return (
        <div className="flex flex-row space-x-4 p-2">
            <Activities activities={props.activities}/>
            { props.children }
        </div>
    )
};
