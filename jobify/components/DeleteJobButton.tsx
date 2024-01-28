import React from "react";
import { Button } from "./ui/button";
import { Badge } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobAction } from "@/utils/actions";
import { RevolvingDot } from "react-loader-spinner";

const DeleteJobButton: React.FC<{ id: string }> = ({
  id,
}): React.ReactElement => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, isPending, mutate } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
        queryClient.invalidateQueries({ queryKey: ["stats"] });
        queryClient.invalidateQueries({ queryKey: ["charts"] });
        toast({ description: "job deleted" });
      } else {
        toast({ description: "there was an error" });
      }
    },
  });

  return (
    <Button
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        mutate(id);
      }}
      className="lowercase shadow-lg dark:shadow-md dark:shadow-cyan-800"
      disabled={isPending}
      size="sm"
    >
      {isPending ? (
        <>
          <RevolvingDot
            visible={true}
            radius={6}
            color="#4fa94d"
            ariaLabel="revolving-dot-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <span style={{ textTransform: "inherit" }}>Deleting...</span>
        </>
      ) : (
        <span style={{ textTransform: "inherit" }}>Delete</span>
      )}
    </Button>
  );
};

export default DeleteJobButton;
