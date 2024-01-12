"use client";
import { deleteTaskWithHiddenInput } from "@/utils/actions";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useCustomFormState } from "@/utils/hooks";
import toast from "react-hot-toast";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-xs btn-error" disabled={pending}>
      {pending ? "pending..." : "delete"}
    </button>
  );
};

const initialState = {
  message: null,
};

const DeleteForm = async ({ id }) => {
  const [state, formAction, resetState] = useCustomFormState(
    deleteTaskWithHiddenInput,
    initialState
  );

  useEffect(() => {
    if (state.message === "delete error") {
      toast.error("error on deleting");
      resetState();
      return;
    }
    if (state.message === "delete success") {
      toast.success("task successfully deleted");
      resetState();
      return;
    }
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <SubmitButton />
    </form>
  );
};

export default DeleteForm;
