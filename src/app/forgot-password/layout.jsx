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
    <div className="loginwrapper min-h-screen ">
      <div className="lg-inner-column ">
        <div className="">
          <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
            <div className="auth-box h-full flex flex-col justify-center">
              <div className="">
                <div className=" mt-12 flex justify-between">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="text-white bg-black hover:bg-gray-600 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
                      className="text-white bg-black hover:bg-gray-600 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Home
                    </button>
                  </Link>
                </div>
                <div className="flex justify-center mb-4">
                  <a href="#">
                    <img className="text-center w-[48px] md:w-[65px]" src="" />
                  </a>
                </div>
                <div>
                  <h5
                    style={mainTitle}
                    className="mb-6 text-center md:ms-[10px] md:text-5xl bg-black-400 font-semibold text-3xl ms-[5px]"
                  >
                    SERVICE MANAGEMENT SYSTEM
                  </h5>
                </div>
              </div>

              {/* <div className="text-center 2xl:mb-10 mb-4">
                <h4 className="font-medium">Sign in</h4>
                <div className="text-slate-500 text-base">
                  Sign in to your account to access
                </div>
              </div> */}
              
                {children}
             
            </div>
            <div className="mt-36 text-sm ">
            <a
              className="underline "
              target="_blank"
              href="https://obifyconsulting.com/"
            >
              <div className="auth-footer text-center ">
                Copyright © {new Date().getFullYear()} Service Management System
                Designed & Developed by Obify Consulting
              </div>
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginlayout;
