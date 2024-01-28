"use client";
import StatsLoadingCard from "@/components/StatsLoadingCard";

import React from "react";
import { Hourglass } from "react-loader-spinner";

const loading: React.FC = (): React.ReactElement => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
      </div>
      <div className="flex justify-center items-center gap-4 mt-36">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
        <span style={{ textTransform: "inherit" }} className="text-xl">
          Chart is building...
        </span>
      </div>
    </>
  );
};

export default loading;
