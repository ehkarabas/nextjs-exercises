"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "@/utils/actions";
import ToursList from "./ToursList";
import { useState } from "react";

const Tours = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["tours", searchValue],
    queryFn: () => getAllTours(searchValue),
  });
  return (
    <>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Enter city or country here..."
            className="input input-bordered join-item flex-grow"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            required
          />
          <button
            className="btn btn-primary join-item uppercase"
            type="button"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              setSearchValue("");
            }}
          >
            {isPending ? "please wait" : "reset"}
          </button>
        </div>
      </form>
      {isPending ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <ToursList data={data} />
      )}
    </>
  );
};

export default Tours;
