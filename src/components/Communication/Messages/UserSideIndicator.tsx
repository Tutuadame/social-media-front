type UserSideIndicatorProps = {
    userSide: boolean,
    firstName: string | undefined,
    lastName: string | undefined,
}

export const UserSideIndicator: React.FC<UserSideIndicatorProps> = ({userSide, firstName = undefined, lastName = undefined}) => {

    return <>        
        <div className={`flex ${userSide ? "justify-end" : "justify-start"} ${userSide ? "mr-28" : "ml-28"}`}>
            {firstName && lastName ?
                <p className={`text-slate-600 px-2`}>{firstName || "firstName"}, {lastName || "lastName"}</p>
            :
                <p className={`text-slate-600 px-2`}>Removed User</p>
            }            
        </div>
    </>
}