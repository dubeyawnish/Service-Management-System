"use client"
import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "@/components/ui/Icon";
// import { useNavigate } from "react-router-dom";





import Swal from "sweetalert2";
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  
  const onSubmit = (data) => {
    setLoading(true);
    console.log("data",data);
    
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
     
      <Textinput
        name="email"
        label="email"
        // defaultValue={users[0].email}
        type="email"
        register={register}
        placeholder="Enter your email"
        error={errors.email}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="password"
        type="password"
        placeholder="Enter your password"
        // defaultValue={users[0].password}
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <div className="flex justify-end">
        {/* <Checkbox
        className="hidden"
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in "
  />*/}
        {/* <Link
          to="/auth/forget-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link> */}
      </div>
      {loading ? (
        <div className="text-center text-keshariya mt-5">
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      <button className="btn btn-dark bg-orange-500 text-white block w-full text-center">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
