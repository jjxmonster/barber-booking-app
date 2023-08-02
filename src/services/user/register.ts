import { UserPayload } from "types/common";

const registerUser = async (body: UserPayload) => {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export default registerUser;
