import React from "react";

type UserSideIndicatorProps = {
    isUserSide: boolean,
    firstName: string,
    lastName: string,
}

export const UserSideIndicator: React.FC<UserSideIndicatorProps> = ({isUserSide, firstName, lastName}) => {

    const dynamicMargin = isUserSide ? "mr-28" : "ml-28";
    const dynamicPosition = isUserSide ? "justify-end" : "justify-start";
    const nameStyle = "text-slate-200 px-2";
    
    return <>        
        <div className={`flex ${dynamicPosition} ${dynamicMargin}`}>
            {firstName && lastName ?
                <p className={nameStyle}>{firstName}, {lastName}</p>
            :
                <p className={nameStyle}>Removed User</p>
            }            
        </div>
    </>
}