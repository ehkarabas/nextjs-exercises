"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from "@/utils/types";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RotatingSquare } from "react-loader-spinner";

import { getSingleJobAction, updateJobAction } from "@/utils/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const EditJobForm: React.FC<{ jobId: string }> = ({
  jobId,
}): React.ReactElement => {
  console.log("🔭 ~ EditJobForm jobId ➡ ➡ ", jobId);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { data: singleJobData } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: singleJobData?.position || "",
      company: singleJobData?.company || "",
      location: singleJobData?.location || "",
      status: (singleJobData?.status as JobStatus) || JobStatus.Pending,
      mode: (singleJobData?.mode as JobMode) || JobMode.FullTime,
    },
  });

  const { isPending: isPendingMutate, mutate } = useMutation({
    mutationFn: (formData: CreateAndEditJobType) =>
      updateJobAction(jobId, formData),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
        queryClient.invalidateQueries({ queryKey: ["job", jobId] });
        queryClient.invalidateQueries({ queryKey: ["stats"] });
        toast({ description: "job updated" });
        form.reset();
        router.push("/jobs");
      } else {
        toast({ description: "there was an error" });
      }
    },
  });

  const onSubmit = (values: CreateAndEditJobType) => {
    console.log(values);
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* position */}
          <CustomFormField name="position" control={form.control} />
          {/* company */}
          <CustomFormField name="company" control={form.control} />
          {/* location */}
          <CustomFormField name="location" control={form.control} />
          {/* job status */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          {/* job  type */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />
          <Button
            className="self-end capitalize shadow-lg dark:shadow-md dark:shadow-cyan-800"
            type="submit"
            disabled={isPendingMutate}
          >
            {isPendingMutate ? (
              <>
                <RotatingSquare
                  visible={true}
                  height="20"
                  width="20"
                  color="#4fa94d"
                  ariaLabel="rotating-square-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
                <span style={{ textTransform: "inherit" }}>Editing...</span>
              </>
            ) : (
              <span style={{ textTransform: "inherit" }}>Edit</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditJobForm;
