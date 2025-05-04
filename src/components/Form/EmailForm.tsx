import { useState } from "react";
import { BasicButton } from "../Button/General/BasicButton.tsx";
import { updateUserInfo } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";
import { useSecurityMenuContext } from "../../context/Identity/SecurityMenuContext.tsx";
import {useLayoutContext} from "../../context/Layout/LayoutOutContext.tsx";

export const EmailForm = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { userAccessToken } = useLayoutContext()
  const { user, loginWithRedirect } = useAuth0();
  const { switchOption } = useSecurityMenuContext();
  const currentId = user?.sub?.split('|')[1] || "no-id";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailContainerStyle = "flex flex-row w-full justify-between bg-slate-800 p-5 rounded-xl shadow-xl";
  const submitButtonStyle = "w-1/3 h-fit bg-slate-400 text-white text-3xl tracking-widest p-3 transition-all font-light mx-auto rounded-xl hover:outline hover:outline-4 hover:outline-offset-4";
  const labelStyle = "text-2xl font-normal text-white my-auto";
  const inputStyle = "w-[13vw] border-4 border-slate-400 p-3 rounded-xl focus:outline-none";

  const handleNewEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewEmail(value);
    setIsValid(emailRegex.test(value));
  };

  const handleCurrentEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentEmail(value);    
  };

  const onSubmit = async () => {
    if (isValid && user?.email === currentEmail) {
      await updateUserInfo(currentId, "email", newEmail, userAccessToken);
      setCurrentEmail("");
      setNewEmail("");
      setIsValid(true);
      switchOption("Overview");
      await loginWithRedirect();
    }
  }

  return (
    <div className="flex flex-col mx-auto w-1/3 gap-y-10">      
      <div className={emailContainerStyle}>
        <h2 className={labelStyle}>Current Email</h2>
        <input
          type="email"
          value={currentEmail}
          onChange={handleCurrentEmailChange}
          placeholder="Enter your current email"
          className={inputStyle}
        />        
      </div>

      <div className={emailContainerStyle}>
        <h2 className={labelStyle}>New Email</h2>
        <input
            type="email"
            value={newEmail}
            onChange={handleNewEmailChange}
            placeholder="Enter the new email"
            className={inputStyle}
          />
      </div>
      <div className="flex flex-row w-full">
        <BasicButton action={() => {onSubmit()}} text="Submit" style={submitButtonStyle}/>
        <BasicButton action={() => {switchOption("Overview")}} text="Back" style={submitButtonStyle}/>
      </div>
      
      {!isValid && <p className="text-red-500 text-sm mt-1">Invalid email address</p>}
    </div>
  );
}