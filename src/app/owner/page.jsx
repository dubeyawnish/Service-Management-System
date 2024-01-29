"use client";
import React from "react";

import ExampleTwo from "@/table/index.js";

const BasicWidget = () => {
  return (
    <div className="space-y-5">
      <div className="flex justify-end w-full">
        {/* <button
          className="text-white px-3 py-2 rounded-md items-center bg-keshariya"
          onClick={()=>navigate("/create-mela")}
        >
          Create Mela
        </button> */}
      </div>
      <ExampleTwo title="Mela Details" />
      {/* <AddTaskModal /> */}
    </div>
  );
};

export default BasicWidget;
