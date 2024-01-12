import TaskForm from "@/components/TaskForm";
import TaskFormCustom from "@/components/TaskFormCustom";
import TaskList from "@/components/TaskList";

export const dynamic = "force-dynamic";

const TasksPage = () => {
  return (
    <div className="max-w-lg">
      <TaskFormCustom />
      <div className="divider">Tasks</div>
      <TaskList />
    </div>
  );
};

export default TasksPage;
