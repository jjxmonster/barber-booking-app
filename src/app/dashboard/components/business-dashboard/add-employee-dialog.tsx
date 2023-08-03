import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Loader2, UserPlus } from "lucide-react";
import React, { FunctionComponent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { useToast } from "components/ui/use-toast";

interface AddEmployeeDialogProps {
  barberShopId: number;
}

const AddEmployeeDialog: FunctionComponent<AddEmployeeDialogProps> = ({
  barberShopId,
}) => {
  const [name, setName] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(
    () =>
      fetch(`/api/employees`, {
        method: "POST",
        body: JSON.stringify({ name, barberShopId }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: () => {
        toast({
          title: "Done!",
          description: `Employee ${name} has been successfully added`,
        });
        setName("");
        queryClient.invalidateQueries(["employees"]);
      },
      onError: err => {
        console.log(err, "ERRRRR");
      },
    }
  );

  return (
    <div className="mt-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <UserPlus className="mr-2" /> Add new employee
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new employee to your business</DialogTitle>
            <DialogDescription>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => mutate()}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEmployeeDialog;
