import { useState } from "react";
import { BasicButton } from "../Button/General/BasicButton.tsx";
import { useSecurityMenuContext } from "../../context/Identity/SecurityMenuContext.tsx";
import { updateUserInfo } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";
import { useLayoutContext } from "../../context/Layout/LayoutOutContext.tsx";
import { FORM_STYLES } from "./form-styles.ts";

export const PasswordForm = () => {
  const [formData, setFormData] = useState({ password: "", passwordAgain: "" });
  const [isValid, setIsValid] = useState(true);
  
  const { userAccessToken } = useLayoutContext();
  const { user } = useAuth0();
  const { switchOption } = useSecurityMenuContext();

  const passwordValidation = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*]/,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStrongPassword = (password: string) => {
    if (password.length < 8) return false;
    const checks = [
      passwordValidation.lowercase.test(password),
      passwordValidation.uppercase.test(password),
      passwordValidation.number.test(password),
      passwordValidation.special.test(password),
    ];
    return checks.filter(Boolean).length >= 3;
  };

  const onSubmit = async () => {
    const currentId = user?.sub?.split('|')[1] || "no-id";
    const { password, passwordAgain } = formData;
    
    if (isStrongPassword(password) && password === passwordAgain) {
      await updateUserInfo(currentId, "password", password, userAccessToken);
      setIsValid(true);
      setFormData({ password: "", passwordAgain: "" });
      switchOption("Overview");
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className={FORM_STYLES.container}>
      <div className={FORM_STYLES.fieldContainer}>
        <h2 className={FORM_STYLES.label}>Password</h2>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your new Password"
          className={FORM_STYLES.input}
        />
      </div>

      <div className={FORM_STYLES.fieldContainer}>
        <h2 className={FORM_STYLES.label}>Password again</h2>
        <input
          type="password"
          value={formData.passwordAgain}
          name="passwordAgain"
          onChange={handleChange}
          placeholder="Enter your new Password again"
          className={FORM_STYLES.input}
        />
      </div>

      <div className={FORM_STYLES.buttonContainer}>
        <BasicButton 
          action={onSubmit} 
          text="Submit" 
          style={FORM_STYLES.submitButton}
        />
        <BasicButton 
          action={() => switchOption("Overview")} 
          text="Back" 
          style={FORM_STYLES.submitButton}
        />
      </div>

      {!isValid && (
        <p className={FORM_STYLES.errorMessage}>
          Invalid Password!
        </p>
      )}
    </div>
  );
};