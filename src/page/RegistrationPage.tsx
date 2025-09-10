import React, {useState} from "react";
import {createProfile} from "../api/profile/profileAPI";
import {useAuth0} from "@auth0/auth0-react";
import {CreateProfileRequest} from "../interface/profile/profile";
import {useNavigate} from "react-router-dom";
import {useLayoutContext} from "../context/Layout/LayoutOutContext.tsx";
import {PAGE} from "./pageStyles.ts";
import { Button } from "../components/Button/buttonStyles.ts";

export const RegistrationPage = () => {

  const { user } = useAuth0();
  const { userAccessToken, userProfile, refetchProfile} = useLayoutContext();
  const currentId = user?.sub?.split('|')[1] || "no-id";
  const [formData, setFormData] = useState({"firstName": "", "lastName": "", "gender": "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    const {firstName, lastName, gender} = formData;
    const requestParamsProfile : CreateProfileRequest = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      profileId: currentId
    }

    userProfile.current = await createProfile(requestParamsProfile, userAccessToken || "").then(result => result);
    await refetchProfile();
    navigate("/");
  }

  return <div className={PAGE.registrationContainer}>
    <h2 className={PAGE.registrationTitle}>ACCOUNT REGISTRATION</h2>
    <div className={PAGE.registrationForm}>
      <h3 className={PAGE.registrationSubtitle}>ENTER YOUR DETAILS</h3>
      <div className={PAGE.registrationInputContainer}>
        <h2 className={PAGE.registrationLabel}>First name</h2>
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder="Enter your first name"
          className={PAGE.registrationInput}
        />
      </div>

      <div className={PAGE.registrationInputContainer}>
        <h2 className={PAGE.registrationLabel}>Last name</h2>
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder="Enter your last name"
          className={PAGE.registrationInput}
        />
      </div>

      <div className={PAGE.registrationInputContainer}>
        <h2 className={PAGE.registrationLabel}>Gender</h2>
        <select
          name="gender"
          className={PAGE.registrationInput}
          defaultValue=""
          onChange={handleChange}
        >
          <option value="" disabled>Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>


      <div className={PAGE.registrationButtonContainer}>
        <Button onClick={() => {onSubmit()}}>Submit</Button>
      </div>
    </div>

  </div>
}