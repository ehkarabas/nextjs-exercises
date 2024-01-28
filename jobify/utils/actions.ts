"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs";
import {
  JobType,
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobStatus,
} from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";


export const authenticateAndRedirect = (): void | string => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  return userId;
};

export const createJobAction = async (
  values: CreateAndEditJobType
): Promise<JobType | null> => {
  const clerkId = authenticateAndRedirect();
  if (typeof clerkId !== "string") return null;
  try {
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.jobifyJob.create({
      data: {
        ...values,
        clerkId,
      },
    });
    return job;
  } catch (error) {
    console.log("🔭 ~ createJobAction error ➡ ➡", error);
    return null;
  }
};

type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export const getAllJobsAction = async ({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> => {
  const userId = authenticateAndRedirect();

  if (typeof userId !== "string")
    return { jobs: [], count: 0, page: 1, totalPages: 0 };

  try {
    let whereClause: Prisma.JobifyJobWhereInput = {
      clerkId: userId,
    };
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }
    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const skip = (page - 1) * limit;

    const jobs: JobType[] = await prisma.jobifyJob.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const count: number = await prisma.jobifyJob.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(count / limit);

    return { jobs, count, page, totalPages };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
};

export const deleteJobAction = async (id: string): Promise<JobType | null> => {
  const userId = authenticateAndRedirect();
  if (typeof userId !== "string") return null;

  try {
    const deletedJob = await prisma.jobifyJob.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
    return deletedJob;
  } catch (error) {
    console.error("🔭 ~ deleteJobAction ~ error ➡ ➡ ", error);
    return null;
  }
};

export const getSingleJobAction = async (
  id: string
): Promise<JobType | null> => {
  const userId = authenticateAndRedirect();
  if (typeof userId !== "string") return null;

  let singleJob: JobType | null = null;
  try {
    singleJob = await prisma.jobifyJob.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    console.error("🔭 ~ getSingleJobAction error ➡ ➡ ", error);
    singleJob = null;
  }
  if (!singleJob) {
    redirect("/jobs");
  }
  return singleJob;
};

export const updateJobAction = async (
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> => {
  const userId = authenticateAndRedirect();
  if (typeof userId !== "string") return null;

  try {
    const updatedJob = await prisma.jobifyJob.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    return updatedJob;
  } catch (error) {
    console.error("🔭 ~ updateJobAction error ➡ ➡ ", error);
    return null;
  }
};

export const getStatsAction = async (): Promise<{
  pending: number;
  interview: number;
  declined: number;
}> => {
  const userId = authenticateAndRedirect();
  if (typeof userId !== "string") redirect("/jobs");

  try {
    const stats = await prisma.jobifyJob.groupBy({
      where: {
        clerkId: userId,
      },
      by: ["status"],
      _count: {
        status: true,
      },
    });

    const statsObject = stats.reduce<{ [key in JobStatus]: number }>(
      (acc, curr) => {
        acc[curr.status as JobStatus] = curr._count.status;
        return acc;
      },
      {} as { [key in JobStatus]: number }
    );

    const defaultStats = { pending: 0, declined: 0, interview: 0 };

    Object.keys(statsObject).length &&
      Object.keys(statsObject).forEach((key) => {
        const statusKey = key as JobStatus;
        defaultStats[statusKey] = statsObject[statusKey];
      });

    return statsObject;
  } catch (error) {
    console.error("🔭 ~ getStatsAction ~ error ➡ ➡ ", error);
    redirect("/jobs");
  }
};

export const getChartsDataAction = async (): Promise<
  { date: string; count: number }[]
> => {
  const userId = authenticateAndRedirect();
  if (typeof userId !== "string") redirect("/jobs");

  const sixMonthsAgo = dayjs().subtract(6, "month").toDate();

  try {
    const jobs = await prisma.jobifyJob.findMany({
      where: { clerkId: userId, createdAt: { gte: sixMonthsAgo } },
      orderBy: { createdAt: "asc" },
    });
    const applicationsPerMonth = jobs.reduce<
      Array<{ date: string; count: number }>
    >((acc, curr) => {
      const date = dayjs(curr?.createdAt).format("MMM YY");

      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count++;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch (error) {
    console.error("🔭 ~ getChartsDataAction ~ error ➡ ➡ ", error);
    redirect("/jobs");
  }
};
