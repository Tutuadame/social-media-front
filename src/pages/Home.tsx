import { HealthCheckButton } from "../components/TextButton/HealthCheckButton";
export const Home = () =>{

    const pageStyle = "justify-center content-center flex flex-col w-min";

    return (
        <div className={pageStyle}>
            <HealthCheckButton/>
        </div>
    );
}