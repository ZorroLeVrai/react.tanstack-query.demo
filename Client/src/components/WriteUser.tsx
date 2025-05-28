import { useActionState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "../helpers/requestHelpers";
import type { UserWithoutId } from "../commonTypes";

interface FormState {
  name: string;
  age: number;
  error: string | null;
}

const WriteUser = () => {
  const [formState, handleSubmit, isPending] = useActionState<FormState, FormData>(actionReducer, {
    name: "",
    age: 0,
    error: null,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: addUserAsync } = useMutation({
    mutationFn: async (userData: UserWithoutId) => {
      return await sendRequest<UserWithoutId>("http://localhost:3000/api/users", "POST", userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      formState.error = error.message;
    },
  });

  async function actionReducer(state: FormState, formData: FormData): Promise<FormState> {
    const name = formData.get("name") as string;
    const age = parseInt(formData.get("age") as string, 10);

    if (!name || isNaN(age)) {
      return { ...state, error: "Invalid input" };
    }

    try {
      await addUserAsync({name, age});
      return { ...state, name, age, error: null };
    } catch (err) {
      if (err instanceof Error) {
        return { ...state, error: err.message };
      }
      return { ...state, error: "An unexpected error occurred" };
    }
  }

  return (
    <>
      <h1>Update User</h1>
      {formState.error && <p style={{ color: "red" }}>{formState.error}</p>}
      {isPending && <p>Submitting...</p>}
      <form action={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" required />
        </div>
        <button type="submit">Add User</button>
      </form>
    </>
  )
}

export default WriteUser;