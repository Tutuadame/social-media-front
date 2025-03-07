import { Outlet } from "react-router-dom";
import { Header, Footer } from "./index";
import { CSSProperties } from "react";

export const Layout = () => {
  const layoutStyle = "flex flex-col flex-nowrap flex-auto min-h-screen bg-slate-600";
  const mainStyle: CSSProperties = {
    height: "80vh",
    width: "100vw"
  };

  return (
    <div className={layoutStyle}>
      <Header/>
      <main className="relative flex flex-grow justify-center m-auto" style={mainStyle}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
