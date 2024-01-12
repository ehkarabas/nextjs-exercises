"use client";
import { useRef } from "react";

import { createTask } from "@/utils/actions";

const TaskForm = () => {
  const ref = useRef(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await createTask(formData);
        ref.current?.reset();
      }}
    >
      <div className="join w-full">
        <input
          type="text"
          className="input input-bordered join-item flex-grow"
          placeholder="type here"
          name="content"
          required
        />
        <button className="btn btn-primary join-item" type="submit">
          create task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
