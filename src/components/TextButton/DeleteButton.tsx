import { useAuth0 } from "@auth0/auth0-react";
import { standardStyle } from "../../style";
import { Button } from "../SampleButton/Button";

type DeleteButtonProps ={
    action: ()=>void
}

export const DeleteButton : React.FC<DeleteButtonProps> = ({ action }) =>{      
          
    const { isAuthenticated } = useAuth0();
    const deleteText:string = "Delete";        

    return (
        isAuthenticated ? <Button action={action} text={deleteText} style={standardStyle}/> : null       
    );          
}