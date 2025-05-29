import UserEditor from './UserEditor';

const CreateUser = () => {
  return (
    <UserEditor mode="create" title="Add User" activeFields={["name", "age"]} />
  )
}

export default CreateUser;