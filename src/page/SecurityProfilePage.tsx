import {useSecurityMenuContext} from "../context/Identity/SecurityMenuContext.tsx";
import {EmailForm} from "../components/Form/EmailForm.tsx";
import {PasswordForm} from "../components/Form/PasswordForm.tsx";
import {useAuth0} from "@auth0/auth0-react";
import {DeleteButton} from "../components";
import {useNavigate} from "react-router-dom";
import {useLayoutContext} from "../context/Layout/LayoutOutContext.tsx";
import {PAGE} from "./pageStyles.ts";
import { Button } from "../components/Button/buttonStyles.ts";


export const SecurityProfilePage = () => {
  const { option } = useSecurityMenuContext();
  const isSecurity = window.location.href.includes("security");
  const navigate = useNavigate();
  const { userProfile } = useLayoutContext();

  return <div className="w-full">
    <div className={PAGE.profileHeader}>
      <Button onClick={() => {navigate("/profile/social")}}>Social</Button>
      <img src={userProfile.current.picture} alt="" className={PAGE.profileAvatar}/>
      <Button onClick={() => {navigate("/profile/security")}}>Security</Button>
    </div>
    <div className={PAGE.profileTitleContainer}>
      <h2 className={PAGE.profileTitle}>Security Profile</h2>
    </div>
    {option === "Overview" ? <SecurityOverview /> : (option === "Email" ? <EmailForm /> : <PasswordForm />)}
  </div>
}

const SecurityOverview = () => {

  const { user } = useAuth0();
  const currentId = user?.sub?.split('|')[1] || "no-id";
  const EMAIL_TYPE = "Email";
  const PASSWORD_TYPE = "Password";
  const DELETE_TYPE = "Delete Your Account";
  const { switchOption } = useSecurityMenuContext();

  return <div className={PAGE.securityOverviewContainer}>
    <div className={PAGE.securityFormContainer}>
      <div className={PAGE.securityOptionContainer}>
        <h3 className={PAGE.securityContainerTitle}>{EMAIL_TYPE}</h3>
        <Button onClick={() => {switchOption(EMAIL_TYPE)}}>Update</Button>
      </div>

      <div className={PAGE.securityOptionContainer}>
        <h3 className={PAGE.securityContainerTitle}>{PASSWORD_TYPE}</h3>
        <Button onClick={() => {switchOption(PASSWORD_TYPE)}}>Update</Button>
      </div>

      <div className={PAGE.securityDeleteContainer}>
        <h3 className={PAGE.securityContainerTitle}>{DELETE_TYPE}</h3>
        <DeleteButton profileId={currentId}/>
      </div>
    </div>
  </div>
}