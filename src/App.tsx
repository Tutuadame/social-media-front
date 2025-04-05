import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NoPage, HomePage } from './page'
import { Layout } from './global'
import { SocialUserPage } from './page/SocialUserPage.tsx'
import { CommunicationPage } from './page/CommunicationPage.tsx'
import { RegistrationPage } from './page/RegistrationPage.tsx'
import {SocialProfilePage} from "./page/SocialProfilePage.tsx";
import {SecurityProfilePage} from "./page/SecurityProfilePage.tsx";
import {ActivityPage} from "./page/ActivityPage.tsx";

function App() {
  return (
    <BrowserRouter>
    <Routes>            
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/communication/conversation/:conversationId" element={<CommunicationPage />} />
        <Route path="/user/:userId" element={<SocialUserPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile/activity" element={<ActivityPage />}/>
        <Route path="/profile/social" element={<SocialProfilePage />} />
        <Route path="/profile/security" element={<SecurityProfilePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
