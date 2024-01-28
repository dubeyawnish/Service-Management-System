"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/slice";
import {URL} from "@/helper/ApiUrl"
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const searchParam = useSearchParams();
  const router=useRouter();

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const dispatch=useDispatch();
  const validateForm = () => {
    const newErrors = {};

    if (!authData.email) {
      newErrors.email = "Email is required";
    }

    if (!authData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // useEffect(() => {
  //   console.log("The query is", searchParam.get("error"));
  // }, []);

  const submitForm = async () => {
    setLoading(true);
    try{
      if (validateForm()) {
      //console.log("App Url",URL)
      const res=await axios.post(`${URL}/api/v1/noauth/login`,authData);
      console.log("Response",res);
      setLoading(false);
      dispatch(setUserData(res));
   
      localStorage.setItem("accessToken",res.data.accessToken);
      localStorage.setItem("name",res.data.loggedInUser.name);
      localStorage.setItem("role",res.data.loggedInUser.role);
      router.push('/');
    } else {
      setLoading(false);
    }
    }
    catch(err){
      setLoading(false);
      console.log("Error in fetching api data",err);
    }
  };
  return (
    <section>
      <div className="">
        <div className="flex items-center justify-center px-4 py-10 ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Login
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Don't have an account?
              <Link
                href="/register"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline ml-2"
              >
                Sign Up
              </Link>
            </p>
            <form  onSubmit={submitForm} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      id="email"
                      placeholder="Email"
                      required
                      onChange={(e) =>
                        setAuthData({ ...authData, email: e.target.value })
                      }
                    ></input>
                    <span className="text-red-500 text-xs font-bold">
                      {errors?.email}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="passwd"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      id="passwd"
                      placeholder="Password"
                      required
                      onChange={(e) =>
                        setAuthData({ ...authData, password: e.target.value })
                      }
                    ></input>
                    <span className="text-red-500 text-xs font-bold">
                      {errors?.password}
                    </span>
                  </div>
                  <div className="text-right">
                    <Link href="/forgot-password">Forgot password ?</Link>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`inline-flex w-full items-center justify-center rounded-md  px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 bg-orange-500 btn btn-dark  ${
                      loading ? "bg-gray-600" : "bg-black"
                    }`}
                    onClick={submitForm}
                  >
                    {loading ? "Processing.." : "Login"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
