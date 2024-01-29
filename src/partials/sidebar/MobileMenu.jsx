'use client'
import React, { useRef, useEffect, useState } from "react";

import Navmenu from "./Navmenu";
import { menuItems } from "@/constant/data";
import SimpleBar from "simplebar-react";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import useDarkMode from "@/hooks/useDarkMode";
// import { Link } from "react-router-dom";
import Link from "next/link";
import useMobileMenu from "@/hooks/useMobileMenu";
import Icon from "@/components/ui/Icon";

// import images
// import MobileLogo from "@/assets/images/logo/logo-c.svg";
import MobileLogo from "@/assets/img/logo.png";
// import MobileLogoWhite from "@/assets/images/logo/logo-c-white.svg";
import MobileLogoWhite from "@/assets/img/logo.png";
import svgRabitImage from "@/assets/images/svg/rabit.svg";
import Image from 'next/image'

const MobileMenu = ({ className = "custom-class" }) => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current.addEventListener("scroll", handleScroll);
  }, [scrollableNodeRef]);

  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();
  const [isDark] = useDarkMode();
  const [mobileMenu, setMobileMenu] = useMobileMenu();

  const userRole = localStorage.getItem("roles");
const filteredMenuItems = menuItems.filter((menuItem) => {
  if (menuItem.role && userRole === menuItem.role) {
    return true;
  }
  return false;
});

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
  return (
    <div
      className={`${className} fixed  top-0 bg-white dark:bg-slate-800 shadow-lg  h-full   w-[248px]`}
    >
      <div className="logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] h-[85px]  px-4 ">
        <Link href="/">
          <div className="flex items-center space-x-4">
            <div className="logo-icon">
              {!isDark && !isSemiDark ? (
                <Image src={MobileLogo} alt="" className="h-[40px] w-[40px]" />
              ) : (
                <Image src={MobileLogoWhite} alt="" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {firstName}
              </h1>
              <span className="text-[15px]"> as {userRoleText}</span>
    
              </h1>
            </div>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="cursor-pointer text-slate-900 dark:text-white text-2xl"
        >
          <Icon icon="heroicons:x-mark" />
        </button>
      </div>

      <div
        className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
          scroll ? " opacity-100" : " opacity-0"
        }`}
      ></div>
      <SimpleBar
        className="sidebar-menu px-4 h-[calc(100%-80px)]"
        scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
       {/* <Navmenu menus={menuItems} />*/}
        <Navmenu menus={filteredMenuItems} />
        <div className="bg-slate-900 hidden mb-24 lg:mb-10 mt-24 p-4 relative text-center rounded-2xl text-white">
          <Image
            src={svgRabitImage}
            alt=""
            className="mx-auto relative -mt-[73px]"
          />
          <div className="max-w-[160px] mx-auto mt-6 ">
            <div className="widget-title">Unlimited Access</div>
            <div className="text-xs font-light">
              Upgrade your system to business plan
            </div>
          </div>
          <div className="mt-6">
            <button className="btn bg-white hover:bg-opacity-80 text-slate-900 btn-sm w-full block">
              Upgrade
            </button>
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default MobileMenu;
