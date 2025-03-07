type UserSideIndicatorProps = {
    userSide: boolean,
    firstName: string,
    lastName: string,
}
//{currentId === senderId ? <></> : <img src={picture} alt="Profile Picture" className={`w-12 h-12 absolute top-8`}/>}

export const UserSideIndicator: React.FC<UserSideIndicatorProps> = ({userSide, firstName, lastName}) => {

    return <>
        {console.log(userSide)}
        <div className={`flex ${userSide ? "justify-end" : "justify-start"} ${userSide ? "mr-28" : "ml-28"}`}>            
            <p className={`text-slate-600 px-2`}>{firstName || "firstName"}, {lastName || "lastName"}</p>            
        </div>
    </>
}