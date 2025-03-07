import { useAuth0 } from "@auth0/auth0-react";
import { MainMenu } from "../components";
import { IdentityProfile, SecurityProfile } from "../components";
import { MessageProfile } from "../components/Profile/Page/Communication/CommunicationProfile";
import { useState } from "react";
import { createSvg } from "../utils/htmlUtils";
import { BackButton } from "../components/Profile/Button/BackButton";

export const Profile = () => {
  const { isAuthenticated } = useAuth0();
  const [profile, setProfile] = useState("");

  // Centralized profile configuration
  const profiles = [
    {
      key: "security",
      text: "Security",
      svgPaths: [
        "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z",
      ],
      component: <SecurityProfile />,
    },
    {
      key: "identity",
      text: "Identity",
      svgPaths: [
        "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z",
      ],
      component: <IdentityProfile />,
    },
    {
      key: "messages",
      text: "Messages",
      svgPaths: [
        "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      ],
      component: <MessageProfile />,
    },
  ];


  const renderProfileContent = () => {
    if (profile === "" || profile === "menu") {
      return (
        <MainMenu
          profileOptions={profiles.map(({ key, text, svgPaths }) => ({
            text,
            svg: createSvg(svgPaths),
            action: () => setProfile(key),
          }))}
        />
      );
    }

    const selectedProfile = profiles.find(({ key }) => key === profile);
    return selectedProfile ? (
      <>
        <BackButton action={() => setProfile("menu")} />
        {selectedProfile.component}
      </>
    ) : null;
  };

  return isAuthenticated ? (
    <>{renderProfileContent()}</>
  ) : (
    <div>
      <p>Loading user information...</p>
      <p>If you are not logged in, this won't work...</p>
    </div>
  );
};
