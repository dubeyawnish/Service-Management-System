"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/slice";
import { URL } from "@/helper/ApiUrl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
// import Textinput from "@/components/ui/Textinput";


const RegisterPage = () => {
  const searchParam = useSearchParams();
  const router = useRouter();

  const [authData, setAuthData] = useState({
    name: "",
    role: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const validateForm = () => {
    const newErrors = {};

    if (!authData.name) {
      newErrors.name = "Full Name is required";
    }

    if (!authData.userName) {
      newErrors.userName = "Username is required";
    }

    if (!authData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(authData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!authData.phone) {
      newErrors.phone = "Phone No. is required";
    }

    if (!authData.role) {
      newErrors.role = "Role is required";
    }

    if (!authData.password) {
      newErrors.password = "Password is required";
    }
    if (!authData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (authData.password !== authData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      //console.log("data",authData);
      if (validateForm()) {
        const res = await axios.post(`${URL}/api/v1/noauth/register`, authData);
        setLoading(false);
        router.push("/login");
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
    <Card>
      <div className="">
        <div className="flex items-center justify-center px-4 py-10 ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Register
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?
              <Link
                href="/login"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline ml-2"
              >
                Log in
              </Link>
            </p>
            <form onSubmit={submitForm} className="mt-8">
           
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      id="name"
                      placeholder="Full name"
                      required
                      onChange={(e) =>
                        setAuthData({ ...authData, name: e.target.value })
                      }
                    ></input>
                    <span className="text-red-500 text-xs font-bold">
                      {errors?.name}
                    </span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="text-base font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      id="username"
                      placeholder="Username"
                      required
                      onChange={(e) =>
                        setAuthData({ ...authData, userName: e.target.value })
                      }
                    ></input>
                    <span className="text-red-500 text-xs font-bold">
                      {errors?.userName}
                    </span>
                  </div>
                </div>
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
                  <label
                    htmlFor="phone"
                    className="text-base font-medium text-gray-900"
                  >
                    Phone No.
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      id="phone"
                      placeholder="Phone"
                      required
                      onChange={(e) =>
                        setAuthData({ ...authData, phone: e.target.value })
                      }
                    ></input>
                    <span className="text-red-500 text-xs font-bold">
                      {errors?.phone}
                    </span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    Role
                  </label>
                  <div className="flex justify-between">
                    <div className="flex ">
                      <div className="mt-2">
                        <input
                          className=""
                          type="radio"
                          id="provider"
                          name="role"
                          value="PROVIDER"
                          required
                          onChange={(e) =>
                            setAuthData({ ...authData, role: e.target.value })
                          }
                        ></input>
                        <span className="text-red-500 text-xs font-bold">
                          {errors?.role}
                        </span>
                      </div>
                      <label
                        htmlFor="provider"
                        className="text-base font-medium text-gray-900 mt-2"
                      >
                        Provider
                      </label>
                    </div>
                    <div className="flex">
                      <div className="mt-2">
                        <input
                          className=""
                          type="radio"
                          id="consumer"
                          name="role"
                          value="CONSUMER"
                          required
                          onChange={(e) =>
                            setAuthData({ ...authData, role: e.target.value })
                          }
                        ></input>
                        <span className="text-red-500 text-xs font-bold">
                          {errors?.role}
                        </span>
                      </div>
                      <label
                        htmlFor="consumer"
                        className="text-base font-medium mt-2 text-gray-900"
                      >
                        Cosumer
                      </label>
                    </div>
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

                  <div>
                    <div className=" mt-2 flex items-center justify-between">
                      <label
                        htmlFor="cnfpasswd"
                        className="text-base font-medium text-gray-900"
                      >
                        Cofirm Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        id="cnfpasswd"
                        placeholder="Confirm Password"
                        required
                        onChange={(e) =>
                          setAuthData({
                            ...authData,
                            confirmPassword: e.target.value,
                          })
                        }
                      ></input>
                      <span className="text-red-500 text-xs font-bold">
                        {errors?.confirmPassword}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`inline-flex w-full items-center bg-orange-500 btn btn-dark justify-center rounded-md  px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80  ${
                      loading ? "bg-gray-600" : "bg-black"
                    }`}
                    onClick={submitForm}
                  >
                    {loading ? "Processing.." : "Register"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </Card>
    </section>
  );
};

export default RegisterPage;
