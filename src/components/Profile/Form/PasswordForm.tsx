import { useState } from "react";
import { BasicButton } from "../../Button/General/BasicButton.tsx";
import { useSecurityMenuContext } from "../../../context/Profile/Identity/SecurityMenuContext.tsx";
import { updateUserInfo } from "../../../api";
import { useAuth0 } from "@auth0/auth0-react";

export const PasswordForm = () => {

  const [formData, setFormData] = useState({"password":"", "passwordAgain":""});
  const [isValid, setIsValid] = useState(true);
  const { user } = useAuth0();
  const labelStyle = "text-2xl font-normal text-white my-auto";
  const inputStyle = "w-[13vw] border-4 border-slate-400 p-3 rounded-xl";
  const passwordContainer = "flex flex-row w-full justify-between bg-slate-800 p-5 rounded-xl shadow-xl";
  const submitButtonStyle = "w-1/3 h-fit bg-slate-400 text-white text-3xl tracking-widest p-3 transition-all font-light mx-auto rounded-xl hover:outline hover:outline-4 hover:outline-offset-4";
  const { switchOption } = useSecurityMenuContext();

  const lowercase = /[a-z]/;
  const uppercase = /[A-Z]/;
  const number = /[0-9]/;
  const special = /[!@#$%^&*]/;
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = async () => {
    const currentId = user?.sub?.split('|')[1] || "no-id";
    if(isStrongPassword(formData.password) && formData.password === formData.passwordAgain) {
      await updateUserInfo(currentId, "password", formData.password);      
      setIsValid(true);
      setFormData({"password":"", "passwordAgain":""});
      switchOption("Overview");
    } else {
      setIsValid(false);
    }
  }

  function isStrongPassword(password:string) {
    if (password.length < 8) return false;
  
    let count = 0;
    if (lowercase.test(password)) count++;
    if (uppercase.test(password)) count++;
    if (number.test(password)) count++;
    if (special.test(password)) count++;
  
    return count >= 3;
  }
  
  return (
    <div className="flex flex-col mx-auto w-1/3 gap-y-10">
      <div className={passwordContainer}>
        <h2 className={labelStyle}>Password</h2>
        <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your new Password"
            className={inputStyle}
          />
      </div>

      <div className={passwordContainer}>
        <h2 className={labelStyle}>Password again</h2>
        <input
            type="password"
            value={formData.passwordAgain}
            name="passwordAgain"
            onChange={handleChange}
            placeholder="Enter your new Password again"
            className={inputStyle}
          />
      </div>
      <div className="flex flex-row w-full">
        <BasicButton action={() => {onSubmit()}} text="Submit" style={submitButtonStyle}/>
        <BasicButton action={() => {switchOption("Overview")}} text="Back" style={submitButtonStyle}/>
      </div>
      
      {!isValid && <p className="text-red-500 text-sm mt-1">Invalid Password!</p>}
    </div>
  );
}