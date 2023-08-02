import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import React, { FunctionComponent, useState } from "react";

import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { UserPlus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

interface AddEmployeeDialogProps {
  barberShopId: number;
}

const AddEmployeeDialog: FunctionComponent<AddEmployeeDialogProps> = ({
  barberShopId,
}) => {
  const [name, setName] = useState("");
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
      onSuccess: () => {},
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
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEmployeeDialog;
