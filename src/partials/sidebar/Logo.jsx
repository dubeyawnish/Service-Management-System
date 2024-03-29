'use client'
import React from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import useDarkMode from "@/hooks/useDarkMode";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";

// import images
// import MobileLogo from "@/assets/images/logo/logo-c.svg";
import MobileLogo from "@/assets/img/logo.png";
// import MobileLogoWhite from "@/assets/images/logo/logo-c-white.svg";
import MobileLogoWhite from "@/assets/img/logo.png";
import Image from 'next/image'
const SidebarLogo = ({ menuHover }) => {




  const role=localStorage.getItem("roles")
  const firstName=localStorage.getItem("name")


  const determineUserRoleText = (role) => {
  if (role === "PROVIDER") {
    return "Provider";
  } else if (role === "CONSUMER") {
    return "CONSUMER";
  } 
  else if (role === "ADMIN") {
    return "Admin";
  }
 
   else {
    return "Unknown Role"; // You can specify a default value if needed
  }
};
const userRoleText = determineUserRoleText(role);
  const [isDark] = useDarkMode();
  const [collapsed, setMenuCollapsed] = useSidebar();
  // semi dark
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();
  return (
    <div
      className={` logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  px-4 
      ${menuHover ? "logo-hovered" : ""}
      ${
        skin === "bordered"
          ? " border-b border-r-0 border-slate-200 dark:border-slate-700"
          : " border-none"
      }
      
      `}
    >
      <Link href="/">
        <div className="flex items-center space-x-4">
          <div className="logo-icon">
            {!isDark && !isSemiDark ? (
              <Image src={MobileLogo} alt="logo" className="h-[40px] w-[40px]" />
            ) : (
              <Image src={MobileLogoWhite} alt="" />
            )}
          </div>

          {(!collapsed || menuHover) && (
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {firstName}
              </h1>
              <span className="text-[15px]"> as {userRoleText}</span>
    
            </div>
          )}
        </div>
      </Link>

      {(!collapsed || menuHover) && (
        <div
          onClick={() => setMenuCollapsed(!collapsed)}
          className={`h-4 w-4 border-[1.5px] border-slate-900 dark:border-slate-700 rounded-full transition-all duration-150
          ${
            collapsed
              ? ""
              : "ring-2 ring-inset ring-offset-4 ring-black-900 dark:ring-slate-400 bg-slate-900 dark:bg-slate-400 dark:ring-offset-slate-700"
          }
          `}
        ></div>
      )}
    </div>
  );
};

export default SidebarLogo;
