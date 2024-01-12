"use client";

import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const countHandler = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h1 className="text-7xl font-bold mb-4 ">{count}</h1>
      <button className="btn btn-secondary uppercase" onClick={countHandler}>
        increase
      </button>
    </div>
  );
};

export default Counter;
