"use client";
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useCustomFormState } from "@/utils/hooks";

import { createTaskCustom } from "@/utils/actions";
import toast from "react-hot-toast";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn join-item btn-primary"
      disabled={pending}
    >
      {pending ? "please wait... " : "create task"}
    </button>
  );
};

const initialState = {
  message: null,
};

const TaskFormCustom = () => {
  const [state, formAction, resetState] = useCustomFormState(
    createTaskCustom,
    initialState
  );
  const formRef = useRef(null);

  useEffect(() => {
    if (state.message === "create error") {
      toast.error("error on creating");
      resetState();
      return;
    }
    if (state.message === "create success") {
      toast.success("task successfully created");
      resetState();
      return;
    }
  });

  return (
    <form
      ref={formRef}
      action={async (state, formData) => {
        await formAction(state, formData);
        formRef.current?.reset();
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
        <SubmitButton />
      </div>
    </form>
  );
};

export default TaskFormCustom;
