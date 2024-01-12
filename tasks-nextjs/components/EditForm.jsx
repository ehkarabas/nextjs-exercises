import { editTaskWithHiddenInput } from "@/utils/actions";

const EditForm = ({ id, content, completed }) => {
  return (
    <form
      action={editTaskWithHiddenInput}
      className="max-w-sm p-12 border border-base-300 rounded-lg"
    >
      EditForm
      <input type="hidden" name="id" value={id} />
      <input
        className="input input-bordered w-full"
        type="text"
        name="content"
        defaultValue={content}
        required
      />
      <div className="form-control my-4">
        <label htmlFor="completed" className="label cursor-pointer">
          <span className="label-text">completed</span>
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
            defaultChecked={completed}
            id="completed"
            name="completed"
          />
        </label>
      </div>
      <button className="btn btn-primary btn-block btn-sm uppercase">
        edit
      </button>
    </form>
  );
};

export default EditForm;
