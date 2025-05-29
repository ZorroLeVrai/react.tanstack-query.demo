import { useActionState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "../helpers/requestHelpers";
import type { UserWithoutId } from "../types";
import styles from "./UserEditor.module.css";

interface FormState {
  name: string;
  age: number;
  error: string | null;
}

type EditMode = "create" | "edit" | "delete";
type FormField = "id" | "name" | "age";

interface UserEditorProps {
  mode : EditMode;
  title: string;
  activeFields: FormField[];
}

const UserEditor = ({mode, title, activeFields}: UserEditorProps) => {
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

  function getFieldClass(fieldName: FormField): string {
    const fieldStyles = [styles.field];
    if (activeFields.includes(fieldName)) {
      fieldStyles.push(styles.active);
    }

    return fieldStyles.join(" ");
  }

  return (
    <>
      <div className="text-center">
        <span className="text-double-size">{title}</span>
      </div>
      {formState.error && <p style={{ color: "red" }}>{formState.error}</p>}
      {isPending && <p>Submitting...</p>}
      <form className="text-center" action={handleSubmit}>
        <div className={styles.fieldGrid}>
          <div className={getFieldClass("id")}>
            <label htmlFor="id">ID:</label>
            <input type="number" id="id" name="id" min={1}/>
          </div>
    
          <div className={getFieldClass("name")}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className={getFieldClass("age")}>
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" required />
          </div>
        </div>
        <div>
          <button>Reset</button>
          <button type="submit">{title}</button>
        </div>
      </form>
    </>
  )
}

export default UserEditor;