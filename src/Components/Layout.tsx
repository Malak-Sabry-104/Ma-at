import { useState, useEffect } from "react";
import type { PropsWithChildren } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

const APK_URL = "https://cdn.hackclub.com/019f3d8b-f677-7078-92a7-a3ddf1f0d216/app-release.apk";

const Layout = ({ children }: PropsWithChildren) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />

      {isMobile && (
        <a
          href={APK_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#22c55e",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 9999,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(34,197,94,.4)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          Android App
        </a>
      )}
    </>
  );
};

export default Layout;
