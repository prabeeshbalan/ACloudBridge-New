import React, { ReactNode } from 'react';
import Link from 'next/link';
import "./globals.css";
import '../../public/styles.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col text-white"
        style={{
          background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
          color: 'white'
        }}
      >
        <nav
          style={{
            background: 'rgba(18, 18, 30, 0.7)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(100, 255, 218, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
          className="text-gray-300 p-7 flex items-center justify-between rounded-full mx-auto my-5 w-full"
        >
          <div className="flex items-center">
            <Link href="/" className="relative group">
              <span className="p-5 font-bold transition duration-300 group-hover:text-[#64FFDA] group-hover:shadow-[0_0_10px_#64FFDA] group-hover:outline group-hover:outline-[#64FFDA] group-hover:outline-1 group-hover:rounded-full">
                <span>aCloudBridge</span>
              </span>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md p-1 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Home
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {[
              { href: "/", label: "Home", tooltip: "Home" },
              { href: "/contact", label: "About Me", tooltip: "About me" },
              { href: "/signup", label: "Register", tooltip: "Create an account" },
              { href: "/login", label: "Login", tooltip: "Log in to your account" },
            ].map(({ href, label, tooltip }) => (
              <Link key={label} href={href} className="relative group">
                <span className="p-5 font-semibold transition duration-300 group-hover:text-[#64FFDA] group-hover:shadow-[0_0_10px_#64FFDA] group-hover:outline group-hover:outline-[#64FFDA] group-hover:outline-1 group-hover:rounded-full">
                  {label}
                </span>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md p-1 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ borderRadius: '100px' }}
                >
                  {tooltip}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        <main className="flex-grow px-4 mx-auto w-full">
          {children}
        </main>

        <footer
          className="text-gray-400 text-center py-4"
          style={{
            background: 'rgba(15, 12, 41, 0.8)',
            backdropFilter: 'blur(6px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <p>&copy; {new Date().getFullYear()} aCloudBridge. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;