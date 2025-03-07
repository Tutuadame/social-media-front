import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton, ProfileButton, RegistrationButton } from '../components';
import { ProfileMenuOption } from '../interface';
import { CSSProperties, useState } from 'react';
import { ProfileHeaderMenu, ProfileMenuButton } from '../components';

export const Header = () => {

    const headerStyle = "bg-slate-800 text-white p-6 shadow-md flex flex-row justify-around m-auto w-full";
    const titleContainerStyle = "container w-3/12 justify-self-center p-3 content-center";
    const borderElementStyles: CSSProperties = {
        height: "13vh",
    };

    const {logout, isAuthenticated} = useAuth0();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen((prev) => !prev);
    };

    const options : ProfileMenuOption[] = [
        {
            title: "Log Out",
            action: () => logout({ logoutParams: { returnTo: window.location.origin } })
        }
    ];

    // Render options when authenticated
    const renderAuthenticatedOptions = () => (
        <>
            <ProfileButton />
            <ProfileMenuButton action={toggleProfileMenu} text="Profile Menu" />
            {isProfileMenuOpen && <ProfileHeaderMenu options={options} />}
        </>
    );

    // Render options when not authenticated
    const renderUnauthenticatedOptions = () => (
        <>
            <LoginButton />
            <RegistrationButton />
        </>
    )

    // Conditional nav styling based on authentication
    const navStyle = isAuthenticated
    ? "p-3 flex flex-row bg-slate-600 rounded justify-around w-1/12 flex-wrap transition-all "
    : "p-3 flex flex-row justify-center w-3/12 transition-all";


    return (
        <header className={headerStyle} style={borderElementStyles}>          
            <div className={titleContainerStyle}>
                <h1 className="text-4xl font-bold  ">Welcome to our Website</h1>
            </div>                     
            <nav className={navStyle}>          
                {isAuthenticated ? renderAuthenticatedOptions() : renderUnauthenticatedOptions()}                                     
            </nav>
        </header>
    );
}