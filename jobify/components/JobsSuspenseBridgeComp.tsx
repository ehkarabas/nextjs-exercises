"use client";
import React, { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { Hourglass } from "react-loader-spinner";
import SearchForm from "./SearchForm";
import JobsList from "./JobsList";

const SearchBarSuspenseFallback: React.FC = (): React.ReactElement => {
  return (
    <div className="p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg border">
      <Skeleton className="h-10" />
      <Skeleton className="h-10 " />
      <Skeleton className="h-10 " />
    </div>
  );
};

const JobsListSuspenseFallBack: React.FC = (): React.ReactElement => {
  return (
    <div className="flex justify-center items-center gap-4 mt-12">
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
        Jobs are listing...
      </span>
    </div>
  );
};

const JobsSuspenseBridgeComp: React.FC = (): React.ReactElement => {
  return (
    <>
      <Suspense fallback={<SearchBarSuspenseFallback />}>
        <SearchForm />
      </Suspense>
      <Suspense fallback={<JobsListSuspenseFallBack />}>
        <JobsList />
      </Suspense>
    </>
  );
};

export default JobsSuspenseBridgeComp;
