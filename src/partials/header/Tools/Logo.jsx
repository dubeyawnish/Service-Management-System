'use client'
import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
// import { Link } from "react-router-dom";
import Link from "next/link";
import useWidth from "@/hooks/useWidth";
import Image from 'next/image'

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
// import MobileLogo from "@/assets/images/logo/logo-c.svg";
// import MobileLogo from "../../../assets/img/logo.png";
import MobileLogo from "@/assets/img/logo.png";
import MobileLogoWhite from "@/assets/images/logo/logo-c-white.svg";
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link href="/">
        {width >= breakpoints.xl ? (
          <Image src={isDark ? LogoWhite : MainLogo} alt=""  className="h-[40px] w-[40px]" />
        ) : (
          <Image src={isDark ? MobileLogoWhite : MobileLogo} alt="" className="h-[40px] w-[40px]"  />
        )}
      </Link>
    </div>
  );
};

export default Logo;
