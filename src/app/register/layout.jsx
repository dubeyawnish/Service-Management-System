"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Loginlayout = ({ children }) => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  const mainTitle = {
    background: "#F44E00",
    backgroundImage:
      "repeating-radial-gradient(ellipse farthest-side at bottom center, #F44E00 0%, #FCCD4D 50%, #D54400 51%, #1B8271 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  return (
    
          <div className="min-h-screen flex flex-col bg-white dark:bg-slate-800">
            <div className=" h-full flex flex-col justify-center">
              <div className=" mt-12 flex justify-between">
                <button
                  type="button"
                  onClick={handleClick}
                  className="text-white bg-orange-500 btn btn-dark font-semibold rounded-lg "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
                <Link href="/">
                  {" "}
                  <button
                    type="button"
                    className="text-white bg-orange-500 btn btn-dark font-semibold rounded-lg  "
                  >
                    Home
                  </button>
                </Link>
              </div>

              <div>
                <h5
                  style={mainTitle}
                  className="mb-6 text-center md:ms-[10px] md:text-5xl bg-black-400 font-semibold text-3xl ms-[5px]"
                >
                  SERVICE MANAGEMENT SYSTEM
                </h5>
              </div>

              {children}
            </div>
            <div className="mt-20 text-sm ">
              <a
                className="underline "
                target="_blank"
                href="https://obifyconsulting.com/"
              >
                <div className="auth-footer text-center ">
                  Copyright © {new Date().getFullYear()} Service Management
                  System Designed & Developed by Obify Consulting
                </div>
              </a>
            </div>
          </div>
       
  );
};

export default Loginlayout;
