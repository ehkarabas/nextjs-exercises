import * as z from "zod";

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

export enum JobStatus {
  Pending = "pending",
  Interview = "interview",
  Declined = "declined",
}

export enum JobMode {
  FullTime = "full-time",
  PartTime = "part-time",
  Internship = "internship",
}

export const createAndEditJobSchema = z.object({
  position: z
    .string()
    .trim()
    .min(1, { message: "position cannot be empty." })
    .min(2, { message: "position must be at least 2 characters." })
    .max(50, { message: "position must be less than 50 characters." })
    .regex(/^[A-Za-z\s]*$/, {
      message: "position must only contain letters and spaces.",
    }),
  company: z
    .string()
    .trim()
    .min(1, { message: "company cannot be empty." })
    .min(2, { message: "company must be at least 2 characters." })
    .max(50, { message: "company must be less than 50 characters." })
    .regex(/^[A-Za-z\s]*$/, {
      message: "company must only contain letters and spaces.",
    }),
  location: z
    .string()
    .trim()
    .min(1, { message: "location cannot be empty." })
    .min(2, { message: "location must be at least 2 characters." })
    .max(50, { message: "location must be less than 50 characters." })
    .regex(/^[A-Za-z\s]*$/, {
      message: "location must only contain letters and spaces.",
    }),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
