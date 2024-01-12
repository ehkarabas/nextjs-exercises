import EditForm from "@/components/EditForm";
import prisma from "@/utils/db";
import Link from "next/link";
import { getTask } from "@/utils/actions";

const SingleTaskPage = async ({ params }) => {
  const task = await getTask(params.id);
  return (
    <>
      <Link href="/tasks" className="btn btn-accent my-8">
        Back To Tasks
      </Link>
      <div className="divider max-w-sm">Edit Task</div>
      <EditForm
        id={params.id}
        content={task?.content}
        completed={task?.completed}
      />
    </>
  );
};

export default SingleTaskPage;
