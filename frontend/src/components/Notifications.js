import React from "react"

const Notifications = ({
    notifications
}) => {

    return (
        <div className="fixed top-2 w-full">
            <div className="flex flex-col items-center space-y-2">
            {notifications.map(notification => 
                <div key={notification.id} className="flex flex-row p-2 bg-rose-500/20 backdrop-blur-sm rounded border border-slate-700">
                    <p className="text-slate-300">{notification}</p>
                </div>
            )}
            </div>
        </div>
    )
}

export default Notifications