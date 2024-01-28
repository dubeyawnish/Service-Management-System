"use-client"
import React from "react";
import Link from "next/link";





// import Illustration1 from "@/assets/images/auth/login1.png";


const registerOwner = ({children}) => {

 
  const mainTitle = {
    background: "#F44E00",
    backgroundImage:
      "repeating-radial-gradient(ellipse farthest-side at bottom center, #F44E00 0%, #FCCD4D 50%, #D54400 51%, #1B8271 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  const handleClick = () => {
  
  };
  return (
    <>
 

      <div className="loginwrapper">
        <div className="lg-inner-column ">
          
          <div className="right-column relative bg-white dark:bg-slate-800">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="p-[1.75rem] h-full flex flex-col justify-center">
                {/* <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link to="/">
                    <img
                      src={isDark ? LogoWhite : Logo}
                      alt=""
                      className="mx-auto"
                    />
                  </Link>
                </div> */}
                <div className="">
                  <div className="flex justify-between">
                    <button
                      type="button"
                     
                      className="text-white bg-orange-500 hover:bg-darkeshariya font-semibold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <Link href="/">
                      {" "}
                      <button
                        type="button"
                        className="text-white bg-keshariya hover:bg-darkeshariya font-semibold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Home
                      </button>
                    </Link>
                  </div>
                  {/* <div className="flex justify-center mb-4">
                    <a href="#">
                      <img
                        className="text-center w-[48px] md:w-[100px]"
                        src="logo.webp"
                      />
                    </a>
                  </div> */}
                  <div>
                    <h5
                      style={mainTitle}
                      className="mb-6 text-center md:ms-[10px] md:text-5xl bg-black-400 font-semibold text-3xl ms-[5px]"
                    >
                      SWADESHI MELA
                    </h5>
                  </div>
                </div>
                <div className="text-center 2xl:mb-10 mb-5">
                  <h4 className="font-medium">Register Your Mela </h4>
                  {/* <div className="text-slate-500 dark:text-slate-400 text-base">
                    Create an account to start using ems-dashboard
                  </div> */}
                </div>
                {/*< OwnerForm/>*/}
                {children}
                <div className="hidden relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                  <div className=" absolute inline-block  bg-white dark:bg-slate-800 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm  text-slate-500  dark:text-slate-400font-normal ">
                    Or continue with
                  </div>
                </div>
                {/* <div className="max-w-[242px] mx-auto mt-8 w-full hidden">
                  <Social />
                </div> */}
                <div className="max-w-[225px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm">
                  Already registered ?
                  {/* <Link
                    to="/login"
                    className="text-keshariya font-medium hover:underline ms-[5px]"
                  >
                    Sign In
                  </Link> */}
                </div>
              </div>
              <a
                className="underline "
                target="_blank"
                href="https://obifyconsulting.com/"
              >
                <div className="auth-footer text-center">
                  Copyright {new Date().getFullYear()}, Swadeshi Mela Website.
                  Designed & Developed by Obify Consulting
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default registerOwner;
