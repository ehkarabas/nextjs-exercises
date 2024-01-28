import React from "react";
import { Card, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const StatsLoadingCard: React.FC = (): React.ReactElement => {
  return (
    <Card className="min-w-[250px] h-[88px]">
      <CardHeader>
        <div className="flex items-center justify-between space-x-4">
          <Skeleton className="h-12 w-[150px]" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </CardHeader>
    </Card>
  );
};

export default StatsLoadingCard;
