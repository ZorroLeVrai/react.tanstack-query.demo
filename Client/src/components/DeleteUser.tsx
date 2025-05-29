import UserEditor from './UserEditor';

const DeleteUser = () => {
  return (
    <UserEditor mode="delete" title="Delete User" activeFields={["id"]} />
  )
}

export default DeleteUser;