import { Button } from "components/ui/button";
import { Loader2 } from "lucide-react";
import React, { FunctionComponent } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: FunctionComponent<SubmitButtonProps> = ({ label }) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={false} type="submit">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
};

export default SubmitButton;
