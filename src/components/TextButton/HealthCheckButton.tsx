import { healthCheck } from "../../api";
import { Button } from "../SampleButton/Button";
import { standardStyle } from "../../style";

export const HealthCheckButton = () =>{      
          
    const healthCheckText:string = "Test Connection";

    return (
        <Button action={healthCheck} text={healthCheckText} style={standardStyle}/>
    );
}