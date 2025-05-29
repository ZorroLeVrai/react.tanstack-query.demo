import { useQuery } from "@tanstack/react-query";
import { sendRequest } from "../helpers/requestHelpers";
import type { User } from "../types";

async function getAllUsers(): Promise<User[]> {
  return await sendRequest("http://localhost:3000/api/users");
}

function Users() {
  const {data: users, isLoading} = useQuery<User[]>({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  return (
    <ul>
      {isLoading && <li>Loading...</li>}
      {users && users.map((user) => (
        <li key={user.id}>
          (ID: {user.id}) {user.name} - Age: {user.age}
        </li>
      ))}
      {!users && !isLoading && <li>No users found.</li>}
    </ul>
  );
}

export default Users;