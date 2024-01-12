"use server";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const getAllTasks = async () => {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
  return tasks;
};

export const getTask = async (id) => {
  const task = prisma.task.findFirstOrThrow({ where: { id: id } });
  return task;
};

export const createTask = async (formData) => {
  const content = formData.get("content");
  const newTask = await prisma.task.create({
    data: {
      content,
    },
  });
  revalidatePath("/tasks");
};

export const createTaskCustom = async (prevState, formData) => {
  const content = formData.get("content");
  const zodTaskValidationSchema = z.object({
    content: z.string().min(5),
  });
  try {
    zodTaskValidationSchema.parse({ content });
    const newTask = await prisma.task.create({
      data: {
        content,
      },
    });
    revalidatePath("/tasks");
    return { message: "create success" };
  } catch (error) {
    console.error("error: ", error);
    return { message: "create error" };
  }
};

export const deleteTaskWithHiddenInput = async (prevState, formData) => {
  const id = formData.get("id");
  try {
    const deletedTask = await prisma.task.delete({ where: { id: id } });
    revalidatePath("/tasks");
    return { message: "delete success" };
  } catch (error) {
    console.error("error: ", error);
    return { message: "delete error" };
  }
};

export const deleteTaskWithBind = async (taskId, formData) => {
  const deletedTask = await prisma.task.delete({ where: { id: taskId } });
  revalidatePath("/tasks");
};

export const editTaskWithHiddenInput = async (formData) => {
  const taskId = formData.get("id");
  const content = formData.get("content");
  const completed = formData.get("completed") === "on";
  const editedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      content,
      completed,
    },
  });
  revalidatePath("/tasks");
  redirect(`/tasks`);
};
