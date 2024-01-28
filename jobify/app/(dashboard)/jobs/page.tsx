import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllJobsAction } from "@/utils/actions";
import React from "react";
import JobsSuspenseBridgeComp from "@/components/JobsSuspenseBridgeComp";

const JobsPage: React.FC = async (): Promise<React.ReactElement> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["jobs", "", "all", 1],
    queryFn: () => getAllJobsAction({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobsSuspenseBridgeComp />
    </HydrationBoundary>
  );
};

export default JobsPage;
