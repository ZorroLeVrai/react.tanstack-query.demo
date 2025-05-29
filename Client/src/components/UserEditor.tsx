import { useActionState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, UserWithoutId } from "../types";
import styles from "./UserEditor.module.css";
import { createUser, deleteUser } from "../requests/apiRequests";

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

  const { mutateAsync: addUserAsync } = useMutation<User, Error, UserWithoutId>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      formState.error = error.message;
    },
  });

  const { mutateAsync: deleteUserAsync } = useMutation<void, Error, number>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      formState.error = error.message;
    },
  });

  async function actionReducer(state: FormState, formData: FormData): Promise<FormState> {
    const id = formData.get("id") as number | null;
    const name = formData.get("name") as string;
    const age = parseInt(formData.get("age") as string, 10);

    if ((!id || isNaN(id)) && ["delete", "edit"].includes(mode)) {
      return { ...state, error: "ID must be provided" };
    }

    if (!name && ["create", "edit"].includes(mode)) {
      return { ...state, error: "Name must be provided" };
    }

    if (isNaN(age) && ["create", "edit"].includes(mode)) {
      return { ...state, error: "Age must be provided" };
    }

    try {
      let userData: User;

      switch (mode) {
        case "create":
          userData = await addUserAsync({name, age});
          return { ...userData, error: null };
        case "delete":
          if (id === null || isNaN(id)) {
            return { ...state, error: "Invalid ID" };
          }
          await deleteUserAsync(id);
          return { ...state, error: null };
        case "edit":
          return state;
        default:
          return { ...state, error: "Invalid mode" };
      }
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

  function handleIdBlur(event: React.FocusEvent<HTMLInputElement>) {
    //TODO: Implement logic to fetch user by ID and populate fields
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
          <div className={getFieldClass("id")} onBlur={handleIdBlur}>
            <label htmlFor="id">ID:</label>
            <input type="number" id="id" name="id" min={1}/>
          </div>
    
          <div className={getFieldClass("name")}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>

          <div className={getFieldClass("age")}>
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" />
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