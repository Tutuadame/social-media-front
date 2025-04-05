import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NoPage, Home } from './page'
import { Layout } from './global'
import { SocialUser } from './page/SocialUser'
import { Communication } from './page/Communication'
import { RegistrationPage } from './page/Registration'
import {SocialProfilePage} from "./page/SocialProfilePage.tsx";
import {SecurityProfilePage} from "./page/SecurityProfilePage.tsx";

function App() {
  return (
    <BrowserRouter>
    <Routes>            
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/communication/conversation/:conversationId" element={<Communication />} />
        <Route path="/user/:userId" element={<SocialUser />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile/activity"/>
        <Route path="/profile/social" element={<SocialProfilePage />} />
        <Route path="/profile/security" element={<SecurityProfilePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
