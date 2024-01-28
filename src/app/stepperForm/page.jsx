"use client";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import InputGroup from "@/components/ui/InputGroup";

import Button from "@/components/ui/Button";

import Icon from "@/components/ui/Icon";
import Flatpickr from "react-flatpickr";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const steps = [
  {
    id: 1,
    title: "Mela Details",
  },
  {
    id: 2,
    title: "Your Details",
  },
  {
    id: 3,
    title: "Review",
  },
];

let stepSchema = yup.object().shape({
  //eventName: yup.string().required(" Mela name is required"),
  eventDesc: yup.string().required("Mela description is required"),
  eventStartDt: yup
    .string()
    .typeError("Mela date is Required")
    .required("Mela date is required"),
  eventEndDt: yup
    .string()
    .typeError("Mela date is Required")
    .required("Mela date is required"),
  eventAddressLine: yup.string().required("Mela address is required"),
  eventStreet: yup.string().required("Mela address is required"),
  eventStateId: yup.number().notRequired(),
  eventState: yup.string().required("Mela State is required"),
  eventCityId: yup.number().notRequired(),
  eventCity: yup.string().required("Mela City is required"),
  eventPostalCode: yup.string().required("Postal code is required"),
  //eventCountry: yup.string().required("Country is required"),

  //   email: yup.string().email("Email is not valid").required("Email is required"),
  //   phone: yup
  //     .string()
  //     .required("Phone number is required")
  //     .matches(/^[0-9]{12}$/, "Phone number is not valid"),
});

let personalSchema = yup.object().shape({
  secretaryFirstName: yup.string().required(" First name is required"),
  secretaryLastName: yup.string().required(" Last name is required"),
  secretaryEmail: yup
    .string()
    .email("Email is not valid")
    .required("Email is required"),
  // secretaryDob: yup.string().required("DOB is Required"),
  secretaryGender: yup.string().required("Gender is Required"),
  secretaryPhone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number is not valid"),
  melaPramukhName: yup.string().required("Mela Pramukh's name is required"),
  melaPramukhPhone: yup
    .string()
    .required("Mela Pramukh's phone no. is required"),
  jilaSanyojakName: yup.string().required("Jila Sanyojak's name is required"),
  jilaSanyojakPhone: yup
    .string()
    .required("Jila Sanyojak's phone no. is required"),
});
let addressSchema = yup.object().shape({
  managerFirstName: yup.string().required(" First name is required"),
  managerLastName: yup.string().required(" Last name is required"),
  managerEmail: yup
    .string()
    .email("Email is not valid")
    .required("Email is required"),
  managerDesignation: yup.string().required("Email is required"),
  managerDOB: yup.string().required("DOB is Required"),
  managerGender: yup.string().required("Gender is Required"),
  managerPhone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number is not valid"),
  managerCity: yup.string().required("City is required"),
  managerState: yup.string().required("State is required"),
});
const url =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

// let socialSchema = yup.object().shape({
//   fburl: yup
//     .string()
//     .required("Facebook url is required")
//     .matches(url, "Facebook url is not valid"),
// });
const OwnerStepperForm = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const [dataStepper, setDataStepper] = useState();
  const [loading, setLoading] = useState(false);
  const [datePicker, setDatePicker] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [uniqueCity, setUniqueCity] = useState([]);
  const [uniqueState, setUniqueState] = useState([]);
  const [managerDobs, setManagerDobs] = useState(new Date());
  const [secretaryDobs, setSecretaryDobs] = useState(new Date());

  const updatedCity = uniqueCity.map((city) => {
    return {
      id: city.id,
      value: city.label,
      label: city.label,
    };
  });
  const updatedState = uniqueState.map((state) => {
    return {
      id: state.id,
      value: state.label,
      label: state.label,
    };
  });
  const Gender = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
    { value: "other", label: "other" },
  ];
  const states = [
    { value: "AndamanAndNicobarIslands", label: "Andaman and Nicobar Islands" },
    { value: "AndhraPradesh", label: "Andhra Pradesh" },
    { value: "ArunachalPradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    {
      value: "DadraAndNagarHaveliAndDamanAndDiu",
      label: "Dadra and Nagar Haveli and Daman and Diu",
    },
    { value: "Delhi", label: "Delhi" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "HimachalPradesh", label: "Himachal Pradesh" },
    { value: "JammuAndKashmir", label: "Jammu and Kashmir" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Ladakh", label: "Ladakh" },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "MadhyaPradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Odisha", label: "Odisha" },
    { value: "Puducherry", label: "Puducherry" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "TamilNadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "UttarPradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "WestBengal", label: "West Bengal" },
  ];

  // find current step schema
  let currentStepSchema;
  switch (stepNumber) {
    case 0:
      currentStepSchema = stepSchema;
      break;
    case 1:
      currentStepSchema = personalSchema;
      break;
    // case 2:
    //   currentStepSchema = addressSchema;
    //   break;

    default:
      currentStepSchema = stepSchema;
  }

  const {
    register,
    formState: { errors, data },
    handleSubmit,
    setValue,

    watch,
  } = useForm({
    resolver: yupResolver(currentStepSchema),

    mode: "all",
  });
  console.log(errors);
  const onSubmit = async (data) => {
    // next step until last step . if last step then submit form

    let totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;
    const isPrevLastStep = stepNumber === totalSteps - 2;
    if (isPrevLastStep) {
      setLoading(true);
      //console.log("stepper", data);
      setDataStepper(data);
      setLoading(false);
    }

    if (isLastStep) {
      setLoading(true);

      const formData = {};
    } else {
      setStepNumber(stepNumber + 1);
    }
  };

  const handlePrev = () => {
    setStepNumber(stepNumber - 1);
  };

  if (loading) {
    return (
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
    );
  }
  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  function formatDateToDdMmYyyy(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div>
      <div>
        <div className="flex z-[5] items-center relative justify-center md:mx-8">
          {steps.map((item, i) => (
            <div
              className="relative z-[1] items-center item flex flex-start flex-1 last:flex-none group"
              key={i}
            >
              <div
                className={`  ${
                  stepNumber >= i
                    ? "bg-orange-500 text-white ring-slate-900 ring-offset-2 dark:ring-offset-slate-500 dark:bg-slate-900 dark:ring-slate-900"
                    : "bg-white ring-slate-900 ring-opacity-70  text-slate-900 dark:text-slate-300 dark:bg-slate-600 dark:ring-slate-600 text-opacity-70"
                }  transition duration-150 icon-box md:h-12 md:w-12 h-7 w-7 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 md:text-lg text-base font-medium`}
              >
                {stepNumber <= i ? (
                  <span> {i + 1}</span>
                ) : (
                  <span className="text-3xl">
                    <Icon icon="bx:check-double" />
                  </span>
                )}
              </div>

              <div
                className={`${
                  stepNumber >= i
                    ? "bg-slate-900 dark:bg-slate-900"
                    : "bg-[#E0EAFF] dark:bg-slate-700"
                } absolute top-1/2 h-[2px] w-full`}
              ></div>
              <div
                className={` ${
                  stepNumber >= i
                    ? " text-slate-900 dark:text-slate-300"
                    : "text-slate-500 dark:text-slate-300 dark:text-opacity-40"
                } absolute top-full text-base md:leading-6 mt-3 transition duration-150 md:opacity-100 opacity-0 group-hover:opacity-100`}
              >
                <span className="w-max">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="conten-box ">
          <form onSubmit={handleSubmit(onSubmit)}>
            {stepNumber === 0 && (
              <div>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-5">
                  <div className="lg:col-span-3 md:col-span-2 col-span-1">
                    <h4 className="md:mt-10 md:text-xl mb-5 text-sm md:mb-6 text-center text-keshariya">
                      Enter Your Mela Details
                    </h4>
                    <div className="w-full">
                      <Textinput
                        label="What's special about your Mela this year!"
                        type="text"
                        placeholder="Enter Mela Description"
                        name="eventDesc"
                        error={errors.eventDesc}
                        register={register}
                      />
                    </div>
                  </div>
                </div>
                {/* <Textinput
                    label="Mela Name"
                    type="text"
                    placeholder="Type your Mela Name"
                    name="eventName"
                    error={errors.eventName}
                    register={register}
                  /> */}
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-5 gap-5">
                  <div>
                    <div>
                      <label htmlFor="default-picker" className=" form-label">
                        Mela Start Date
                      </label>
                      <Flatpickr
                        className="form-control py-2"
                        value={startDate}
                        onChange={(date) => {
                          // console.log("start date", date[0]);
                          setStartDate(date[0]);
                          setValue(
                            "eventStartDt",
                            formatDateToDdMmYyyy(date[0])
                          );
                          //console.log(dob);
                        }}
                        id="default-picker"
                      />
                      <div
                        className={`mt-2 ${
                          errors?.eventStartDt
                            ? " inline-block text-[0.875rem] text-white text-sm  bg-danger-500 text-[10px] px-2 rounded"
                            : " text-danger-500 block text-sm"
                        }`}
                      >
                        {errors?.eventStartDt?.message}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="default-pickers" className=" form-label">
                      Mela End Date
                    </label>

                    <Flatpickr
                      className="form-control py-2"
                      value={endDate}
                      onChange={(date) => {
                        // console.log("start date", date[0]);
                        setEndDate(date[0]);
                        setValue("eventEndDt", formatDateToDdMmYyyy(date[0]));
                        //console.log(dob);
                      }}
                      id="default-pickers"
                    />
                    <div
                      className={`mt-2 ${
                        errors?.eventEndDt
                          ? " inline-block text-[0.875rem] text-white text-sm  bg-danger-500 text-[10px] px-2 rounded"
                          : " text-danger-500 block text-sm"
                      }`}
                    >
                      {errors?.eventEndDt?.message}
                    </div>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-5 gap-5">
                  <Textinput
                    label="Mela Address Line 1"
                    type="text"
                    //   prepend="MY (+6)"
                    placeholder="Line 1"
                    name="eventStreet"
                    error={errors.eventStreet}
                    register={register}
                  />
                  <Textinput
                    label="Mela Address Line 2"
                    type="text"
                    //   prepend="MY (+6)"
                    placeholder="Line 2"
                    name="eventAddressLine"
                    error={errors.eventAddressLine}
                    register={register}
                  />
                </div>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-5 gap-5">
                  <div>
                    <label htmlFor="eventState" className="form-label ">
                      Mela State
                    </label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      styles={styles}
                      name="clear"
                      options={states}
                      isClearable
                      onChange={(e) => {
                        setValue("eventState", e.label);
                        setValue("eventStateId", e.id);
                      }}
                      id="eventState"
                    />

                    <div
                      className={`mt-2 ${
                        errors?.eventState
                          ? " inline-block text-[0.875rem]   text-danger-500 text-[10px] px-2 rounded"
                          : " text-danger-500 block text-sm"
                      }`}
                    >
                      {errors?.eventState?.message}
                    </div>
                  </div>
                  <div>
                    <Textinput
                      label="Mela City"
                      type="text"
                      placeholder="Mela City"
                      name="eventCity"
                      error={errors.eventCity}
                      register={register}
                      //   hasicon
                    />
                    {/* <label htmlFor="eventCity" className="form-label ">
                      Mela City
                    </label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      styles={styles}
                      name="clear"
                      options={uniqueCity}
                      isClearable
                      onChange={(e) => {
                        console.log("EVent", e);
                        setValue("eventCity", e.label);
                        setValue("eventCityId", e.id);
                      }}
                      id="eventCity"
                    />
                    <div
                      className={`mt-2 ${errors?.eventCity
                        ? " inline-block text-[0.875rem]   text-danger-500 text-[10px] px-2 rounded"
                        : " text-danger-500 block text-sm"
                        }`}
                    >
                      {errors?.eventCity?.message}
                    </div> */}
                  </div>
                </div>
                <div className="mt-5 md:w-[250px]">
                  <Textinput
                    label="Pin Code"
                    type="text"
                    placeholder="Enter Pin Code"
                    name="eventPostalCode"
                    error={errors.eventPostalCode}
                    register={register}
                    //   hasicon
                  />
                  {/* <Textinput
                    label="Country"
                    type="text"
                    placeholder="Enter Country"
                    name="eventCountry"
                    error={errors.eventCountry}
                    register={register}
                  //   hasicon
                  /> */}
                </div>
              </div>
            )}

            {stepNumber === 1 && (
              <div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <div className="md:col-span-2 col-span-1">
                    <h4 className="md:mt-[60px] mt-[30px] md:text-xl text-sm md:mb-6 text-center text-keshariya">
                      Enter Your Details
                    </h4>
                  </div>
                  <Textinput
                    label="Your First Name"
                    type="text"
                    placeholder="First name"
                    name="secretaryFirstName"
                    error={errors.secretaryFirstName}
                    register={register}
                  />
                  <Textinput
                    label="Your Last Name"
                    type="text"
                    placeholder="Last name"
                    name="secretaryLastName"
                    error={errors.secretaryLastName}
                    register={register}
                  />

                  {/* <div>
                    <div>
                      <label htmlFor="SecretaryDOB" className=" form-label">
                        Date of Birth
                      </label>

                      <Flatpickr
                        className="form-control py-2"
                        value={secretaryDobs}
                        onChange={(date) => {
                          // console.log("start date", date[0]);
                          setSecretaryDobs(date[0]);
                          setValue(
                            "secretaryDob",
                            formatDateToDdMmYyyy(date[0])
                          );
                          //console.log(dob);
                        }}
                        id="ManagerDOB"
                      />
                      <div
                        className={`mt-2 ${errors?.secretaryDob
                          ? " inline-block text-[0.875rem] text-white text-sm  bg-danger-500 text-[10px] px-2 rounded"
                          : " text-danger-500 block text-sm"
                          }`}
                      >
                        {errors?.secretaryDob?.message}
                      </div>
                    </div>
                  </div> */}
                  <div>
                    <label htmlFor="SecretaryGender" className="form-label ">
                      Your Gender
                    </label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      styles={styles}
                      name="clear"
                      options={Gender}
                      isClearable
                      onChange={(e) => {
                        setValue("secretaryGender", e.value);
                      }}
                      id="SecretaryGender"
                    />

                    <div
                      className={`mt-2 ${
                        errors?.secretaryGender
                          ? " inline-block text-[0.875rem]   text-danger-500 text-[10px] px-2 rounded"
                          : " text-danger-500 block text-sm"
                      }`}
                    >
                      {errors?.secretaryGender?.message}
                    </div>
                  </div>
                  <Textinput
                    label="Your Email"
                    type="text"
                    placeholder="Enter Email"
                    name="secretaryEmail"
                    error={errors.secretaryEmail}
                    register={register}
                  />
                  <InputGroup
                    label=" Your Phone Number"
                    type="text"
                    prepend="(+91)"
                    placeholder="Enter Phone Number"
                    name="secretaryPhone"
                    error={errors.secretaryPhone}
                    register={register}
                  />

                  <Textinput
                    label="Contact Person Name"
                    type="text"
                    placeholder="Contact Person Name"
                    name="melaPramukhName"
                    error={errors.melaPramukhName}
                    register={register}
                  />
                  {/* <p className="text-xs">This detail displayed on the website</p> */}
                  <InputGroup
                    label="Contact Person Phone Number"
                    type="text"
                    prepend="(+91)"
                    placeholder="Contact Person Phone Number"
                    name="melaPramukhPhone"
                    error={errors.melaPramukhPhone}
                    register={register}
                  />

                  <Textinput
                    label="Jila Sanyojak Name"
                    type="text"
                    placeholder="Jila Sanyojak Name"
                    name="jilaSanyojakName"
                    error={errors.jilaSanyojakName}
                    register={register}
                  />
                  <InputGroup
                    label="Jila Sanyojak Phone Number"
                    type="text"
                    prepend="(+91)"
                    placeholder="Jila Sanyojak Phone Number"
                    name="jilaSanyojakPhone"
                    error={errors.jilaSanyojakPhone}
                    register={register}
                  />
                  {/* <div>
                    <label htmlFor="secretaryState" className="form-label ">
                      State
                    </label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      styles={styles}
                      name="clear"
                      options={uniqueState}
                      isClearable
                      onChange={(e) => {
                        setValue("secretaryState", e.label);
                      }}
                      id="secretaryState"
                    />

                    <div
                      className={`mt-2 ${errors?.secretaryState
                        ? " inline-block text-[0.875rem]   text-danger-500 text-[10px] px-2 rounded"
                        : " text-danger-500 block text-sm"
                        }`}
                    >
                      {errors?.secretaryState?.message}
                    </div>
                  </div> */}

                  {/* <div>
                    <label htmlFor="secretaryCity" className="form-label ">
                      City
                    </label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      styles={styles}
                      name="clear"
                      options={uniqueCity}
                      isClearable
                      onChange={(e) => {
                        setValue("secretaryCity", e.label);
                      }}
                      id="secretaryCity"
                    />

                    <div
                      className={`mt-2 ${errors?.secretaryCity
                        ? " inline-block text-[0.875rem]   text-danger-500 text-[10px] px-2 rounded"
                        : " text-danger-500 block text-sm"
                        }`}
                    >
                      {errors?.secretaryCity?.message}
                    </div>
                  </div> */}
                </div>
              </div>
            )}
            {/* {stepNumber === 2 && (
              <div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <div className="md:col-span-2 col-span-1">
                    <h4 className="mt-10 text-base text-slate-800 dark:text-slate-300 mb-6">
                      Enter Your Details
                    </h4>
                  </div>
                  <Textinput
                    label="First name"
                    type="text"
                    placeholder="First name"
                    name="managerFirstName"
                    error={errors.managerFirstName}
                    register={register}
                  />
                  <Textinput
                    label="Last name"
                    type="text"
                    placeholder="Last name"
                    name="managerLastName"
                    error={errors.managerLastName}
                    register={register}
                  />
                  <Textinput
                    label="Designation"
                    type="text"
                    placeholder="Your Designation"
                    name="managerDesignation"
                    error={errors.managerDesignation}
                    register={register}
                  />
                  <div>
                    <div>
                      <label htmlFor="ManagerDOB" className=" form-label">
                        Date of Birth
                      </label>

                      <Flatpickr
                        className="form-control py-2"
                        value={managerDobs}
                        onChange={(date) => {
                          // console.log("start date", date[0]);
                          setManagerDobs(date[0]);
                          setValue("managerDOB", formatDateToDdMmYyyy(date[0]));
                          //console.log(dob);
                        }}
                        id="ManagerDOB"
                      />
                      <div
                        className={`mt-2 ${errors?.managerDOB
                          ? " inline-block text-[0.875rem] text-white text-sm  bg-danger-500 text-[10px] px-2 rounded"
                          : " text-danger-500 block text-sm"
                          }`}
                      >
                        {errors?.managerDOB?.message}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ManagerGender" className="form-label ">
                      Gender
                    </label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      styles={styles}
                      name="clear"
                      options={Gender}
                      isClearable
                      onChange={(e) => {
                        setValue("managerGender", e.value);
                      }}
                      id="ManagerGender"
                    />
                    <div
                      className={`mt-2 ${errors?.managerGender
                        ? " inline-block text-[0.875rem]   text-danger-500 text-[10px] px-2 rounded"
                        : " text-danger-500 block text-sm"
                        }`}
                    >
                      {errors?.managerGender?.message}
                    </div>
                  </div>
                  <Textinput
                    label="Email"
                    type="text"
                    placeholder="Enter Email"
                    name="managerEmail"
                    error={errors.managerEmail}
                    register={register}
                  />
                  <InputGroup
                    label="Phone Number"
                    type="text"
                    prepend="(+91)"
                    placeholder="Enter Phone Number"
                    name="managerPhone"
                    error={errors.managerPhone}
                    register={register}
                  />

                  <div>
                    <label htmlFor="MangerState" className="form-label ">
                      State
                    </label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      styles={styles}
                      name="clear"
                      options={uniqueState}
                      isClearable
                      onChange={(e) => {
                        setValue("managerState", e.label);
                      }}
                      id="MangerState"
                    />

                    <div
                      className={`mt-2 ${errors?.managerState
                        ? " inline-block text-[0.875rem]   text-danger-500 text-[10px] px-2 rounded"
                        : " text-danger-500 block text-sm"
                        }`}
                    >
                      {errors?.managerState?.message}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="managerCity" className="form-label ">
                      City
                    </label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      styles={styles}
                      name="clear"
                      options={uniqueCity}
                      isClearable
                      onChange={(e) => {
                        setValue("managerCity", e.label);
                      }}
                      id="managerCity"
                    />

                    <div
                      className={`mt-2 ${errors?.managerCity
                        ? " inline-block text-[0.875rem]   text-danger-500 text-[10px] px-2 rounded"
                        : " text-danger-500 block text-sm"
                        }`}
                    >
                      {errors?.managerCity?.message}
                    </div>
                  </div>
                </div>
              </div>
            )} */}
            {stepNumber === 2 && (
              <div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                  <div className="lg:col-span-3 md:col-span-2 col-span-1">
                    <h4 className="md:mt-[90px] mt-[20px] md:text-xl text-[11px] md:mb-6 text-center text-keshariya">
                      Review Your Details & Click Submit Request Button Below
                    </h4>
                  </div>
                </div>
              </div>
            )}
            {stepNumber === 3 && (
              <div
                style={{
                  // width: "40rem",
                  // height: "10rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="mt-16"
              >
                <div
                  // className="footer-text d-flex flex-column justify-content-center align-items-center"
                  style={{ marginRight: "0rem", textAlign: "center" }}
                >
                  <h4 className="">
                    <b>
                      Thank You! <br /> We have received your response .
                    </b>
                  </h4>
                </div>
              </div>
            )}

            <div
              className={`${
                stepNumber > 0 ? "flex justify-between" : " text-right"
              } mt-10`}
            >
              {stepNumber !== 0 && stepNumber <= 2 && (
                <Button
                  text="prev"
                  className="btn-dark  bg-orange-500 hover:bg-darkeshariya"
                  onClick={handlePrev}
                />
              )}
              {stepNumber <= 2 && (
                <Button
                  text={
                    stepNumber !== steps.length - 1 && stepNumber <= 2
                      ? "next"
                      : "Send Request"
                  }
                  className="btn-dark bg-orange-500 hover:bg-darkeshariya"
                  type="submit"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OwnerStepperForm;
