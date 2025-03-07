import { CSSProperties } from "react";

export const Footer = () => {
    const borderElementStyles: CSSProperties = {
        height: "7vh",
    };

    return (
    <footer className="bg-slate-800 text-white text-center p-4" style={borderElementStyles}>
        <p>&copy; 2024 Our Website. All rights reserved.</p>
    </footer>
    );
}