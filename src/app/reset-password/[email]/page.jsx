"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/slice";
import { URL } from "@/helper/ApiUrl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ResetPage = ({ params }) => {
  const searchParam = useSearchParams();
  const router = useRouter();

  const [authData, setAuthData] = useState({
    password: "",
    cnfPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!authData.password) {
      newErrors.password = "Password is required";
    }
    if (!authData.cnfPassword) {
      newErrors.cnfPassword = "Confirm Password is required";
    } else if (authData.password !== authData.cnfPassword) {
      newErrors.cnfPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // useEffect(() => {
  //   console.log("The query is", searchParam.get("error"));
  // }, []);

  const submitForm = async () => {
    setLoading(true);

    try {
      if (validateForm()) {
        const res = await axios.post(`${URL}/api/v1/noauth/reset-password`, {
          email: params.email,
          signature: searchParam.get("signature"),
          password: authData.password,
        });

        setLoading(false);
        if (res.data.status == 200) {
          Swal.fire({
            title: "Password Reset Successfully!",

            icon: "success",
          });

          router.push("/login");
        } else {
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
          });
        }
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log("Error in fetching api data", err);
    }
  };
  return (
    <section>
      <div className="">
        <div className="flex items-center justify-center px-4 py-10 ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Reset Password
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
            <form onSubmit={submitForm} className="mt-8">
              <div className="space-y-5">
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
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="passwdd"
                      className="text-base font-medium text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      id="passwdd"
                      placeholder="Confirm Password"
                      required
                      onChange={(e) =>
                        setAuthData({
                          ...authData,
                          cnfPassword: e.target.value,
                        })
                      }
                    ></input>
                    <span className="text-red-500 text-xs font-bold">
                      {errors?.cnfPassword}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`inline-flex w-full items-center justify-center rounded-md  px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 bg-orange-500 btn btn-dark ${
                      loading ? "bg-gray-600" : "bg-black"
                    }`}
                    onClick={submitForm}
                  >
                    {loading ? "Processing.." : "Reset Password"}
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

export default ResetPage;
