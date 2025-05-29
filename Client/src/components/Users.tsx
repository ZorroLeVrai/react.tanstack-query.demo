import { useQuery } from "@tanstack/react-query";
import type { User } from "../types";
import { getAllUsers } from "../requests/apiRequests";



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