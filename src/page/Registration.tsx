import { useState } from "react";
import { BasicButton } from "../components/Button/General/BasicButton";
import { createProfile } from "../api/profile/profileAPI";
import { useAuth0 } from "@auth0/auth0-react";
import { CreateProfileRequest } from "../interface/profile/profile";
import { createMember } from "../api/communication/memberAPI";
import { CreateMemberRequest } from "../interface/communication/member";
import { useNavigate } from "react-router-dom";

export const RegistrationPage = () => {

  const { user } = useAuth0();
  const currentId = user?.sub?.split('|')[1] || "no-id";
  const inputContainerStyle = "flex flex-row w-full justify-between bg-slate-800 p-5 rounded-xl shadow-xl";
  const labelStyle = "text-2xl font-normal text-white my-auto";
  const inputStyle = "w-[13vw] border-4 border-slate-400 p-3 rounded-xl focus:outline-none";
  const submitButtonStyle = "w-1/3 h-fit bg-slate-400 text-white text-3xl tracking-widest p-3 transition-all font-light mx-auto rounded-xl hover:outline hover:outline-4 hover:outline-offset-4";
  const [formData, setFormData] = useState({
    "firstName": "",
    "lastName": "",
    "gender": ""
  });
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

    const requestParamsMember: CreateMemberRequest = {
      firstName: firstName,
      lastName: lastName,      
      memberId: currentId
    }

    await createProfile(requestParamsProfile).then(result => result);
    await createMember(requestParamsMember).then(result => result);

    navigate("/");
  }

  return <div className="flex flex-col w-full text-center">
    <h2 className="text-4xl tracking-widest text-white my-10">ACCOUNT REGISTRATION</h2>
    <div className="flex flex-col mx-auto w-2/5 bg-slate-700 p-10 gap-y-14 rounded-xl shadow-xl my-auto">
      <h3 className="text-left text-2xl tracking-widest text-white">ENTER YOUR DETAILS</h3>
      <div className={inputContainerStyle}>
        <h2 className={labelStyle}>First name</h2>
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder="Enter your first name"
          className={inputStyle}
        />
      </div>

      <div className={inputContainerStyle}>
        <h2 className={labelStyle}>Last name</h2>
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder="Enter your last name"
          className={inputStyle}
        />
      </div>

      <div className={inputContainerStyle}>
        <h2 className={labelStyle}>Gender</h2>
        <select
          name="gender"
          className={inputStyle}
          defaultValue=""
          onChange={handleChange}
        >
          <option value="" disabled>Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>


      <div className="flex flex-row w-full">
        <BasicButton action={() => {onSubmit()}} text="Submit" style={submitButtonStyle}/>        
      </div>
    </div>

  </div>
}