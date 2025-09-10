import { useState } from "react";
import { updateUserInfo } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";
import { useSecurityMenuContext } from "../../context/Identity/SecurityMenuContext.tsx";
import { useLayoutContext } from "../../context/Layout/LayoutOutContext.tsx";
import { FORM_STYLES } from "./formStyles.ts";
import { Button } from "../Button/buttonStyles.ts";

export const EmailForm = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  
  const { userAccessToken } = useLayoutContext();
  const { user, loginWithRedirect } = useAuth0();
  const { switchOption } = useSecurityMenuContext();
  
  const currentId = user?.sub?.split('|')[1] || "no-id";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleNewEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewEmail(value);
    setIsValid(emailRegex.test(value));
  };

  const handleCurrentEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEmail(e.target.value);
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
  };

  return (
    <div className={FORM_STYLES.container}>
      <div className={FORM_STYLES.fieldContainer}>
        <h2 className={FORM_STYLES.label}>Current Email</h2>
        <input
          type="email"
          value={currentEmail}
          onChange={handleCurrentEmailChange}
          placeholder="Enter your current email"
          className={FORM_STYLES.input}
        />
      </div>

      <div className={FORM_STYLES.fieldContainer}>
        <h2 className={FORM_STYLES.label}>New Email</h2>
        <input
          type="email"
          value={newEmail}
          onChange={handleNewEmailChange}
          placeholder="Enter the new email"
          className={FORM_STYLES.input}
        />
      </div>

      <div className={FORM_STYLES.buttonContainer}>
        <Button onClick={onSubmit}>Submit</Button>
        <Button onClick={() => switchOption("Overview")}>Back</Button>
      </div>

      {!isValid && (
        <p className={FORM_STYLES.errorMessage}>
          Invalid email address
        </p>
      )}
    </div>
  );
};